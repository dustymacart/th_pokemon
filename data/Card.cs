namespace ThPokemon.Data;

public sealed record Card(
    int Id,
    string Name,
    string Number,
    string Set,
    string Rarity,
    string Condition,
    int Quantity);
