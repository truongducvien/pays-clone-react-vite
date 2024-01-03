const SS_KEY = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
} as const;

export const getSessionStorage = (key: (typeof SS_KEY)[keyof typeof SS_KEY]) => {
  const result = sessionStorage.getItem(key);
  if (result) {
    return JSON.parse(result);
  }
  return null;
};

export const setSessionStorage = (key: (typeof SS_KEY)[keyof typeof SS_KEY], value: unknown) => {
  return sessionStorage.setItem(key, JSON.stringify(value));
};

export const removeSessionStorage = (key: (typeof SS_KEY)[keyof typeof SS_KEY]) => {
  return sessionStorage.removeItem(key);
};
