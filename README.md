# Pokémon Card Inventory

An ASP.NET Core 8 application for searching a Pokémon card inventory. It is
designed to be published and hosted directly by IIS using the ASP.NET Core
Module; no Node.js process or reverse proxy is required.

## Build and publish

The IIS server needs the .NET 8 Hosting Bundle. Publish the deployable artifact:

```powershell
dotnet publish .\ThPokemon.csproj --configuration Release --output .\publish
```

Deploy the contents of `publish`, not the repository source, to the IIS site's
physical path. The publish command generates the required `web.config`.

Configure the IIS application pool with:

- .NET CLR version: **No Managed Code**
- Managed pipeline mode: **Integrated**
- Identity: an account granted access to the SQL Server database

The IIS site binding controls the external port. Configure an HTTP binding for
port 8080. A future HTTPS binding can use port 443 without changing application
code.

## Database

SQL Server is configured at `th-windb01.digitalcanyon.org` with Windows
Integrated Authentication. The default catalog name is `PokemonCards`; change
it if the actual database has a different name.

Configuration is in `appsettings.json`:

```json
{
  "Database": {
    "Enabled": true
  },
  "ConnectionStrings": {
    "PokemonDatabase": "Server=th-windb01.digitalcanyon.org;Database=PokemonCards;Integrated Security=True;Encrypt=True;TrustServerCertificate=False"
  }
}
```

For deployment, configuration can be supplied without modifying the artifact:

```text
Database__Enabled=true
ConnectionStrings__PokemonDatabase=Server=th-windb01.digitalcanyon.org;Database=PokemonCards;Integrated Security=True;Encrypt=True;TrustServerCertificate=False
```

Run `database/schema.sql` against the target catalog to create `dbo.Cards`.
Grant the IIS application-pool identity permission to connect and read that
table. With database access disabled, the application uses `data/cards.json` for
local development.

To open SQL Server Management Studio with domain credentials:

```powershell
runas /netonly /user:<domain>\<username> "C:\Program Files\Microsoft SQL Server Management Studio 22\Release\Common7\IDE\Ssms.exe"
```

## Local development

```powershell
dotnet run
```

Open <http://localhost:8080>. The health endpoint is `GET /health`, and
`GET /api/cards?number=4` searches the inventory.

## Project structure

```text
Data/                   JSON and SQL Server data access
database/schema.sql     SQL Server table definition
public/                 Browser UI
Program.cs              HTTP API and application setup
ThPokemon.csproj        ASP.NET Core project
appsettings.json        Runtime and database configuration
```
