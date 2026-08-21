const test = require('node:test');
const assert = require('node:assert/strict');
const { findCardsByNumber, normalizeNumber } = require('../src/cardRepository');

test('normalizes padded and fraction-style collector numbers', () => {
  assert.equal(normalizeNumber('004/102'), '4');
  assert.equal(normalizeNumber('4'), '4');
  assert.equal(normalizeNumber(' 004 '), '4');
});

test('finds the same collector number across different sets', async () => {
  const cards = await findCardsByNumber('4');
  assert.equal(cards.length, 2);
  assert.deepEqual(cards.map((card) => card.name), ['Charizard', 'Charmander']);
});

test('returns the inventory when the query is empty', async () => {
  assert.equal((await findCardsByNumber('')).length, 4);
});
