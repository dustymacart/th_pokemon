# Pokémon Card Inventory

A small starter site for looking up owned Pokémon cards by collector number.

## Run it

Requires Node.js 18 or newer. No package installation is needed.

```powershell
npm start
```

Then open <http://localhost:8080>. The server listens on all network interfaces,
so it can also be reached at `http://<server-name-or-ip>:8080` when Windows
Firewall and the network allow that port.

To use a different address or port for a session:

```powershell
$env:HOST = "0.0.0.0"
$env:PORT = "8080"
npm start
```

Run the tests with `npm test`.

## Windows web server deployment

Install Node.js 18 or newer on the server, copy the application to it, and run
`npm start` from the application directory. Configure the Node process as a
Windows service or another supervised process so it starts automatically and
restarts after failures.

Allow inbound TCP port 8080 in Windows Firewall if clients will connect to Node
directly.

For HTTPS on port 443, keep this application listening internally on port 8080
and configure IIS as a reverse proxy to `http://localhost:8080`. Bind the site's
TLS certificate to port 443 in IIS. This keeps certificate management and HTTPS
termination in IIS instead of the Node application.

## Database

Open a terminal with access to your domain credentials and run:

```powershell
runas /netonly /user:<domain>\<username> "C:\Program Files\Microsoft SQL Server Management Studio 22\Release\Common7\IDE\Ssms.exe"
```

## Project structure

```text
data/cards.json          Starter inventory data
public/                  Browser UI (HTML, CSS, and JavaScript)
src/cardRepository.js    Data access and number matching
src/server.js            HTTP server and JSON API
test/                    Repository tests
```

`GET /api/cards?number=4` returns every owned card whose collector number matches
`4`, including stored values such as `004/102`. An empty number returns the full
inventory.

The browser calls the API, and the API uses `cardRepository`. That boundary makes
it straightforward to replace `data/cards.json` with SQLite or PostgreSQL later.

## Suggested next steps

1. Replace the sample rows in `data/cards.json` with your inventory.
2. Add create/edit/delete endpoints for managing cards.
3. Move the repository to a database once multiple people or frequent edits are involved.
4. Add set, rarity, Pokémon name, and condition filters.
