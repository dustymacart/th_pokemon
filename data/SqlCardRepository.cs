using Microsoft.Data.SqlClient;

namespace ThPokemon.Data;

public sealed class SqlCardRepository(IConfiguration configuration) : ICardRepository
{
    public async Task<IReadOnlyList<Card>> FindByNumberAsync(
        string? number,
        CancellationToken cancellationToken = default)
    {
        var connectionString = configuration.GetConnectionString("PokemonDatabase")
            ?? throw new InvalidOperationException("ConnectionStrings:PokemonDatabase is not configured.");

        var cards = new List<Card>();
        await using var connection = new SqlConnection(connectionString);
        await connection.OpenAsync(cancellationToken);

        const string sql = """
            SELECT Id, Name, CollectorNumber, SetName, Rarity, Condition, Quantity
            FROM dbo.Cards
            ORDER BY SetName, CollectorNumber, Name;
            """;

        await using var command = new SqlCommand(sql, connection);
        await using var reader = await command.ExecuteReaderAsync(cancellationToken);
        while (await reader.ReadAsync(cancellationToken))
        {
            cards.Add(new Card(
                reader.GetInt32(0),
                reader.GetString(1),
                reader.GetString(2),
                reader.GetString(3),
                reader.GetString(4),
                reader.GetString(5),
                reader.GetInt32(6)));
        }

        var query = CollectorNumber.Normalize(number);
        return string.IsNullOrEmpty(query)
            ? cards
            : cards.Where(card => CollectorNumber.Normalize(card.Number) == query).ToList();
    }
}
