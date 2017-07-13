import qs from 'query-string';

export const extractQuery = url => qs.extract(url);

export const parseAuthCode = (query) => {
  const { code } = qs.parse(query);
  return code;
};

export const parseAccessToken = (url) => {
  console.log(url);
};
