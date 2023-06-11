import { useState } from 'react';
import { HistoryItem, LS_KEYS } from 'shared';

export function useHistory(userName: string): Array<HistoryItem> {
  const [value] = useState(() => {
    const users = localStorage.getItem(LS_KEYS.users);
    if (!users || !userName) return [];
    const usersObj = JSON.parse(users);
    const user = usersObj[LS_KEYS.users][userName] ?? undefined;
    const history = user && user[LS_KEYS.history] ? user[LS_KEYS.history] : [];
    return history ?? [];
  });

  return value;
}
