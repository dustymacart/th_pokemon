# Pokémon Card Inventory

A small starter site for looking up owned Pokémon cards by collector number.

## Run it

Requires Node.js 18 or newer. No package installation is needed.

```powershell
npm start
```

Then open <http://localhost:3000>.

Run the tests with `npm test`.

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
