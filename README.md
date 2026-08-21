# Pokémon Card Inventory

A small starter site for looking up owned Pokémon cards by collector number.

## Run it

Requires Node.js 18 or newer. No package installation is needed.

```powershell
npm start
```

Then open <http://localhost:8080>. By default, the application listens on all
network interfaces, so other computers can use
`http://<server-name-or-ip>:8080` when the firewall permits it.

To use a different address or port for a session:

```powershell
$env:HOST = "0.0.0.0"
$env:PORT = "8080"
npm start
```

Run the tests with `npm test`.

## Windows web server deployment

Install Node.js 18 or newer, deploy the complete repository, and run `npm start`
from the application directory. The application serves HTTP directly on port
8080; IIS is not required.

Allow inbound TCP port 8080 in Windows Firewall. Also ensure IIS or another
program is not already using that port. Configure the Node process as a Windows
service or another supervised process so it starts automatically and restarts
after failures.

Set `PORT` before starting the application to use any other available port. Port
443 additionally requires an HTTPS certificate and TLS configuration; that can
be added separately when the certificate and desired hostname are available.

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
