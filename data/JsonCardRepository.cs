using System.Text.Json;

namespace ThPokemon.Data;

public sealed class JsonCardRepository(IWebHostEnvironment environment) : ICardRepository
{
    public async Task<IReadOnlyList<Card>> FindByNumberAsync(
        string? number,
        CancellationToken cancellationToken = default)
    {
        var filePath = Path.Combine(environment.ContentRootPath, "data", "cards.json");
        await using var stream = File.OpenRead(filePath);
        var cards = await JsonSerializer.DeserializeAsync<List<Card>>(
            stream,
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true },
            cancellationToken) ?? [];

        var query = CollectorNumber.Normalize(number);
        return string.IsNullOrEmpty(query)
            ? cards
            : cards.Where(card => CollectorNumber.Normalize(card.Number) == query).ToList();
    }
}
