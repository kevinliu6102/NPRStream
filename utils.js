const qs = require('qs');

export const parseAuthCode = (url) => {
  const { code } = qs.parse(url);
  return code;
};

export const parseAccessToken = (url) => {
  console.log(url);
};
