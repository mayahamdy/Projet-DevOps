const { formatTitle } = require('./utils');

test('doit mettre le titre en majuscules', () => {
  expect(formatTitle('asso')).toBe('ASSO');
});