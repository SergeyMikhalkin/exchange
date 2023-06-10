import { useState, useEffect } from 'react';
import { LS_KEYS } from 'shared';

export function useLocalStorageUsers() {
  const [value, setValue] = useState(() => {
    const users = localStorage.getItem(LS_KEYS.users);
    return users ? JSON.parse(users) : { [LS_KEYS.users]: {} };
  });

  useEffect(() => {
    if (JSON.stringify(value) !== '{}') {
      localStorage.setItem(LS_KEYS.users, JSON.stringify(value));
    }
  }, [value]);

  return [value, setValue];
}
