const assert = require('node:assert');
const { buildShareText } = require('../src/shareText.js');

// Winner, named.
const won = buildShareText({ name: 'Will', position: 12, won: true });
assert.ok(won.includes('Will is'), 'uses name as subject');
assert.ok(won.includes('#12'), 'includes position');
assert.ok(won.includes('top 100'), 'winner copy mentions the top 100');
assert.ok(!/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(won), 'no emoji in caption');

// Non-winner, anonymous.
const lost = buildShareText({ name: '', position: 240, won: false });
assert.ok(lost.startsWith("I'm #240"), 'anonymous falls back to "I\'m" + position');
assert.ok(!lost.includes('top 100'), 'non-winner copy does not claim top 100');

// Name with surrounding whitespace is trimmed.
const trimmed = buildShareText({ name: '  Ana  ', position: 5, won: true });
assert.ok(trimmed.includes('Ana is'), 'trims whitespace from name');

console.log('PASS test-share');
