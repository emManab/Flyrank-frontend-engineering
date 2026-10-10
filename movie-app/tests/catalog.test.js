import test from 'node:test';
import assert from 'node:assert/strict';

const titles = [
  { title: 'Avengers Assemble', year: '2012–2019', type: 'Series', genre: 'Action' },
  { title: 'Frozen', year: '2013', type: 'Movie', genre: 'Animation' },
  { title: 'The Matrix', year: '1999', type: 'Movie', genre: 'Sci-Fi' },
];

function filterMedia(items, query, genre = 'All') {
  const needle = query.trim().toLowerCase();
  return items.filter(item => {
    const matchesQuery = !needle || `${item.title} ${item.year} ${item.type} ${item.genre}`.toLowerCase().includes(needle);
    return matchesQuery && (genre === 'All' || item.genre === genre);
  });
}

test('search matches titles without case sensitivity', () => {
  assert.deepEqual(filterMedia(titles, 'fROZen').map(item => item.title), ['Frozen']);
});

test('search matches metadata as well as titles', () => {
  assert.deepEqual(filterMedia(titles, '1999').map(item => item.title), ['The Matrix']);
});

test('genre filter narrows results', () => {
  assert.deepEqual(filterMedia(titles, '', 'Action').map(item => item.title), ['Avengers Assemble']);
});

test('blank query returns the full collection', () => {
  assert.equal(filterMedia(titles, '   ').length, 3);
});
