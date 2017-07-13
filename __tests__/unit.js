import { extractQuery, parseAuthCode } from '../utils';

const url = 'nprstream://home?code=7539864448211580947feff93c38bcce20435071b84dcc17d6fb4869cf675c99fa2400a788ad10de&state=asdf&uidt=1499820062';
const query = 'code=7539864448211580947feff93c38bcce20435071b84dcc17d6fb4869cf675c99fa2400a788ad10de&state=asdf&uidt=1499820062';

describe('extractQuery tests', () => {
  it('returns the query of a URI string', () => {
    const actual = extractQuery(url);
    expect(actual).toEqual(query);
  });
});

describe('parseAuthCode tests', () => {
  it('parses authorization codes from URI querystrings', () => {
    const actual = parseAuthCode(query);
    const expected = '7539864448211580947feff93c38bcce20435071b84dcc17d6fb4869cf675c99fa2400a788ad10de';
    expect(actual).toEqual(expected);
  });
});
