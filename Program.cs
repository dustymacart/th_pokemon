using Microsoft.Extensions.FileProviders;
using ThPokemon.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<DatabaseOptions>(builder.Configuration.GetSection(DatabaseOptions.SectionName));
builder.Services.AddSingleton<JsonCardRepository>();
builder.Services.AddSingleton<SqlCardRepository>();
builder.Services.AddSingleton<ICardRepository>(services =>
{
    var configuration = services.GetRequiredService<IConfiguration>();
    return configuration.GetValue<bool>($"{DatabaseOptions.SectionName}:Enabled")
        ? services.GetRequiredService<SqlCardRepository>()
        : services.GetRequiredService<JsonCardRepository>();
});

var app = builder.Build();

var publicPath = Path.Combine(app.Environment.ContentRootPath, "public");
var publicFiles = new PhysicalFileProvider(publicPath);
app.UseDefaultFiles(new DefaultFilesOptions { FileProvider = publicFiles });
app.UseStaticFiles(new StaticFileOptions { FileProvider = publicFiles });

app.MapGet("/api/cards", async (string? number, ICardRepository repository, CancellationToken cancellationToken) =>
{
    var cards = await repository.FindByNumberAsync(number, cancellationToken);
    return Results.Ok(new { cards, count = cards.Count });
});

app.MapGet("/health", () => Results.Ok(new { status = "healthy" }));

app.Run();

public partial class Program;
