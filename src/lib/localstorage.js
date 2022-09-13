/*
 *
 * Title: localStorage
 * Description: --
 * Author: Saymon
 * Date: 25 November 2021 (Thursday)
 *
 */
export const ISSERVER = typeof window === 'undefined';

export const getLocal = (localKey) => {
  if (!ISSERVER) {
    const getValue = localStorage.getItem(localKey);
    let returnValue;
    try {
      returnValue = JSON.parse(getValue);
    } catch (e) {
      returnValue = getValue;
    }
    return returnValue;
  }
};

// Remove Session
export const removeSession = (sessionKey) => {
  if (!ISSERVER) {
    sessionStorage.removeItem(sessionKey);
    return true;
  }
};

export const setLocal = (localKey, localValue, removeFromSession) => {
  if (!ISSERVER) {
    const stringifyIfObj =
      typeof localValue === 'object' || Array.isArray(localValue)
        ? JSON.stringify(localValue)
        : localValue;

    localStorage.setItem(localKey, stringifyIfObj);
    if (removeFromSession) removeSession(localKey);
    return getLocal(localKey);
  }
};

export const removeLocal = (localKey) => {
  if (!ISSERVER) {
    localStorage.removeItem(localKey);
    return true;
  }
};

// Get Session
export const getSession = (sessionKey) => {
  if (!ISSERVER) {
    const getValue = sessionStorage.getItem(sessionKey);
    let returnValue;
    try {
      returnValue = JSON.parse(getValue);
    } catch (e) {
      returnValue = getValue;
    }
    return returnValue;
  }
};

// Set Session and get return with session value
export const setSession = (sessionKey, sessionValue, removeFromLocal) => {
  if (!ISSERVER) {
    const stringifyIfObj =
      typeof sessionValue === 'object' || Array.isArray(sessionValue)
        ? JSON.stringify(sessionValue)
        : sessionValue;

    sessionStorage.setItem(sessionKey, stringifyIfObj);
    if (removeFromLocal) removeLocal(sessionKey);
    return getSession(sessionKey);
  }
};

// Set Both Local and Session
export const setBoth = (key, value) => {
  setLocal(key, value);
  setSession(key, value);
  return getLocal(key);
};

// checkBoth
export const checkBoth = (key, includeOr) => {
  if (!ISSERVER) {
    const checkLocal = getLocal(key);
    const checkSession = getSession(key);

    if (includeOr) {
      if (checkLocal || checkSession) return true;
      return false;
    }
    if (checkLocal && checkSession) return true;
    return false;
  }
};

// Check Local
export const checkLocal = (key) => {
  if (!ISSERVER) {
    const checkLocalStorage = getLocal(key);
    if (checkLocalStorage) return true;
    return false;
  }
};

// Remove Both Local and Session
export const removeBoth = (key) => {
  removeLocal(key);
  removeSession(key);
  return true;
};
