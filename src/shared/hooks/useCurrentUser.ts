import { useState, useEffect } from 'react';
import { LS_KEYS } from 'shared';

export function useCurrentUser() {
  const [value, setValue] = useState(() => {
    const currentUser = localStorage.getItem(LS_KEYS.currentUser) ?? '';
    return currentUser;
  });

  useEffect(() => {
    if (value !== '') {
      localStorage.setItem(LS_KEYS.currentUser, value);
    }
  }, [value]);

  return [value, setValue] as const;
}
