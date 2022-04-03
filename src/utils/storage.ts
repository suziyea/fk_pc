export const setLocalStorage = (key: string, value: any) => {
  if (typeof value === 'object') {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, value);
  }
};

export const getLocalStorage = (key: string) => {
  const value = localStorage.getItem(key) || '';
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
};

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const setSessionStorage = (key: string, value: any) => {
  if (typeof value === 'object') {
    sessionStorage.setItem(key, JSON.stringify(value));
  } else {
    sessionStorage.setItem(key, value);
  }
};

export const getSessionStorage = (key: string) => {
  const value = sessionStorage.getItem(key) || '';
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
};

export const removeSessionStorage = (key: string) => {
  sessionStorage.removeItem(key);
};
