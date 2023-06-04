import { useState, useEffect } from 'react';
import { LOCAL_STORAGE_USERS } from 'shared';

export function useLocalStorage() {
  const [value, setValue] = useState(() => {
    const users = window.localStorage.getItem(LOCAL_STORAGE_USERS);
    return users ? JSON.parse(users) : {};
  });

  useEffect(() => {
    if (JSON.stringify(value) !== '{}') {
      const users = window.localStorage.getItem(LOCAL_STORAGE_USERS);
      const newUsersObj = users ? JSON.parse(users) : {};
      newUsersObj[value] = 'true';
      window.localStorage.setItem(LOCAL_STORAGE_USERS, JSON.stringify(newUsersObj));
    }
  }, [value]);

  return [value, setValue];
}
