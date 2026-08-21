const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const { findCardsByNumber } = require('./cardRepository');

const port = Number(process.env.PORT) || 8080;
const host = process.env.HOST || '0.0.0.0';
const publicDirectory = path.join(__dirname, '..', 'public');
const staticFiles = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/styles.css', ['styles.css', 'text/css; charset=utf-8']],
  ['/app.js', ['app.js', 'text/javascript; charset=utf-8']]
]);

function sendJson(response, status, body) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(body));
}

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host || 'localhost'}`);
    if (request.method === 'GET' && url.pathname === '/api/cards') {
      const cards = await findCardsByNumber(url.searchParams.get('number') || '');
      return sendJson(response, 200, { cards, count: cards.length });
    }

    const staticFile = staticFiles.get(url.pathname);
    if (request.method === 'GET' && staticFile) {
      const [fileName, contentType] = staticFile;
      const contents = await fs.readFile(path.join(publicDirectory, fileName));
      response.writeHead(200, { 'Content-Type': contentType });
      return response.end(contents);
    }

    return sendJson(response, 404, { error: 'Not found' });
  } catch (error) {
    console.error(error);
    return sendJson(response, 500, { error: 'Unable to load card inventory' });
  }
});

server.listen(port, host, () => {
  console.log(`Pokémon inventory listening on http://${host}:${port}`);
});
