import { LS_KEYS } from 'shared';

type FavoriteItem = {
  [key: string]: boolean;
};

export function getFavoritesFromLocalStorage(): string[] {
  const users = localStorage.getItem(LS_KEYS.users);
  const currentUser = localStorage.getItem(LS_KEYS.currentUser);
  if (!users || !currentUser) return [];

  const usersObj = JSON.parse(users);
  const user = usersObj[LS_KEYS.users][currentUser] ?? undefined;
  const favorites = user && user[LS_KEYS.favorites] ? user[LS_KEYS.favorites] : undefined;
  if(!favorites) return [];
  const mergedFavorites = Object.values(favorites) as Array<FavoriteItem>;
  return mergedFavorites.map((x) => Object.keys(x)).flat();
}
