import { Middleware } from '@reduxjs/toolkit';
import { LS_KEYS } from 'shared';

export const saveFavoriteMiddleware: Middleware = () => (next) => (action) => {
  const { payload } = action;

  if (payload && !Number.isNaN(parseInt(payload, 10))) {
    const currentUser = localStorage.getItem(LS_KEYS.currentUser);
    if (currentUser) {
      const allUsersStr = localStorage.getItem(LS_KEYS.users) ?? '';
      const allUsersObj = JSON.parse(allUsersStr) ?? {};

      if (
        JSON.stringify(allUsersObj) !== '{}' &&
        allUsersObj[LS_KEYS.users] &&
        allUsersObj[LS_KEYS.users][currentUser] &&
        allUsersObj[LS_KEYS.users][currentUser][LS_KEYS.favorites]
      ) {
        const userFavorites = allUsersObj[LS_KEYS.users][currentUser][LS_KEYS.favorites];

        if (userFavorites[payload]) {
          delete userFavorites[payload];
        } else {
          userFavorites[payload] = true;
        }

        const updatedUsersStr = JSON.stringify(allUsersObj);
        if (updatedUsersStr) localStorage.setItem(LS_KEYS.users, updatedUsersStr);
      }
    }
  }

  const result = next(action);
  return result;
};
