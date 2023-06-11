import { useState } from 'react';
import { LS_KEYS } from 'shared';

type FavoriteItem = {
  [key: string]: boolean;
};

export function useFavorites(userName: string) {
  const [value] = useState(() => {
    const users = localStorage.getItem(LS_KEYS.users);
    if (!users || !userName) return [];
    const usersObj = JSON.parse(users);
    const user = usersObj[LS_KEYS.users][userName] ?? undefined;
    const favorites = user && user[LS_KEYS.favorites] ? user[LS_KEYS.favorites] : undefined;
    const mergedFavorites = Object.values(favorites) as Array<FavoriteItem>;
    return mergedFavorites.map((x) => Object.keys(x)).flat();
  });

  return value;
}
