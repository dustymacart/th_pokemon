const fs = require('node:fs/promises');
const path = require('node:path');

const defaultDataFile = path.join(__dirname, '..', 'data', 'cards.json');

function normalizeNumber(value) {
  const collectorNumber = String(value ?? '').trim().split('/')[0];
  if (!collectorNumber) return '';
  const numericValue = Number.parseInt(collectorNumber, 10);
  return Number.isNaN(numericValue) ? collectorNumber.toLowerCase() : String(numericValue);
}

async function readCards(dataFile = defaultDataFile) {
  return JSON.parse(await fs.readFile(dataFile, 'utf8'));
}

async function findCardsByNumber(number, dataFile = defaultDataFile) {
  const cards = await readCards(dataFile);
  const query = normalizeNumber(number);
  return query ? cards.filter((card) => normalizeNumber(card.number) === query) : cards;
}

module.exports = { findCardsByNumber, normalizeNumber, readCards };
