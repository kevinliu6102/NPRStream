export const convertToTimeStamp = (expiresInSec) => { // eslint-disable-line
  const expiresInMs = expiresInSec * 1000;
  return new Date().getTime() + expiresInMs;
};
