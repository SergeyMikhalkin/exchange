import { useState, useEffect } from 'react';
import { LS_KEYS } from 'shared';

export function useLocalStorage() {
  const [value, setValue] = useState(() => {
    const users = window.localStorage.getItem(LS_KEYS.users);
    return users ? JSON.parse(users) : {};
  });

  useEffect(() => {
    if (JSON.stringify(value) !== '{}') {
      const users = window.localStorage.getItem(LS_KEYS.users);
      const newUsersObj = users ? JSON.parse(users) : {};
      newUsersObj[value] = 'true';
      window.localStorage.setItem(LS_KEYS.users, JSON.stringify(newUsersObj));
    }
  }, [value]);

  return [value, setValue];
}
