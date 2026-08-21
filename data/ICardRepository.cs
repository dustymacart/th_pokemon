namespace ThPokemon.Data;

public interface ICardRepository
{
    Task<IReadOnlyList<Card>> FindByNumberAsync(string? number, CancellationToken cancellationToken = default);
}

internal static class CollectorNumber
{
    public static string Normalize(string? value)
    {
        var collectorNumber = (value ?? string.Empty).Trim().Split('/')[0];
        return int.TryParse(collectorNumber, out var numericValue)
            ? numericValue.ToString()
            : collectorNumber.ToLowerInvariant();
    }
}
