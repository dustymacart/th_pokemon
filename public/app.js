const form = document.querySelector('#search-form');
const input = document.querySelector('#card-number');
const section = document.querySelector('#results-section');
const grid = document.querySelector('#card-grid');
const message = document.querySelector('#message');
const count = document.querySelector('#result-count');

function escapeHtml(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
}

function cardMarkup(card) {
  return `<article class="card">
    <div class="card-topline"><span>${escapeHtml(card.set)}</span><strong>#${escapeHtml(card.number)}</strong></div>
    <h3>${escapeHtml(card.name)}</h3>
    <dl>
      <div><dt>Rarity</dt><dd>${escapeHtml(card.rarity)}</dd></div>
      <div><dt>Condition</dt><dd>${escapeHtml(card.condition)}</dd></div>
      <div><dt>Owned</dt><dd>${card.quantity}</dd></div>
    </dl>
  </article>`;
}

async function loadCards(number = '') {
  section.setAttribute('aria-busy', 'true');
  message.textContent = 'Searching your collection…';
  message.hidden = false;
  grid.replaceChildren();
  try {
    const response = await fetch(`/api/cards?number=${encodeURIComponent(number)}`);
    if (!response.ok) throw new Error('Request failed');
    const result = await response.json();
    count.textContent = `${result.count} ${result.count === 1 ? 'match' : 'matches'}`;
    if (!result.count) {
      message.textContent = `No owned cards found for “${number}”.`;
      return;
    }
    message.hidden = true;
    grid.innerHTML = result.cards.map(cardMarkup).join('');
  } catch {
    count.textContent = '';
    message.textContent = 'The inventory could not be loaded. Please try again.';
  } finally {
    section.setAttribute('aria-busy', 'false');
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  loadCards(input.value.trim());
});

loadCards();
