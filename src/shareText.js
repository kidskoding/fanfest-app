// Pure share-caption builder, isolated from react-native so it is node-testable.
// No side effects, no platform APIs — just string construction.
function buildShareText({ name, position, won }) {
  const trimmed = (name || '').trim();
  const subject = trimmed ? `${trimmed} is` : "I'm";
  if (won) {
    return `${subject} #${position} at FIFA FanFest 2026 — in the top 100, prize secured. Think you can beat that rank?`;
  }
  return `${subject} #${position} at FIFA FanFest 2026. Sign up before me for a shot at one of 100 prizes.`;
}

module.exports = { buildShareText };
