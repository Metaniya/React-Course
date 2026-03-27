// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  // We use a function inside useState so it only runs once (on Mount)
  const [value, setValue] = useState(() => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  } catch { // No (err) needed here anymore!
    return initialValue;
  }
});
  // This is the Lifecycle Mental Model: 
  // "Whenever 'value' or 'key' changes, update the browser storage"
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};