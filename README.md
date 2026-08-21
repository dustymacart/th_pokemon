# Pokémon Card Inventory

A small starter site for looking up owned Pokémon cards by collector number.

## Run it

Requires Node.js 18 or newer. No package installation is needed.

```powershell
npm start
```

Then open <http://localhost:3000>. By default, Node listens only on the local
machine because IIS provides external access.

To use a different address or port for a session:

```powershell
$env:HOST = "127.0.0.1"
$env:PORT = "3000"
npm start
```

Run the tests with `npm test`.

## Windows web server deployment

The repository includes `web.config`, which forwards IIS requests to the Node
application at `http://127.0.0.1:3000`.

On the server:

1. Install Node.js 18 or newer, IIS URL Rewrite, and IIS Application Request
   Routing (ARR).
2. In IIS Manager, open the server's **Application Request Routing Cache**, then
   **Server Proxy Settings**, and enable the proxy.
3. Deploy the complete repository and set the IIS site's physical path to its
   root (the directory containing `web.config`).
4. Add an IIS HTTP binding on port 8080 with no host name, or with the actual DNS
   host name clients will use.
5. Run `npm start` from the application directory. Configure it as a Windows
   service or other supervised process for automatic startup and recovery.
6. Allow inbound TCP port 8080 in Windows Firewall.

For HTTPS, add an IIS HTTPS binding on port 443 and select the site's TLS
certificate. Node remains private on port 3000; IIS handles both public ports and
certificate management.

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
