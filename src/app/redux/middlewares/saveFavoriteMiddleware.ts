import { Middleware } from '@reduxjs/toolkit';
import { LS_KEYS } from 'shared';

enum BankInfo {
  filialId = 'filialId',
  searchString = 'searchString',
}

export const saveFavoriteMiddleware: Middleware = () => (next) => (action) => {
  const { payload } = action;

  if (payload && BankInfo.filialId in payload && BankInfo.searchString in payload) {
    const { filialId, searchString } = payload;
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

        if (userFavorites[searchString]) {
          if (userFavorites[searchString][filialId]) {
            delete userFavorites[searchString][filialId];
            if (JSON.stringify(userFavorites[searchString]) === '{}')
              delete userFavorites[searchString];
          } else userFavorites[searchString][filialId] = true;
        } else {
          userFavorites[searchString] = { [filialId]: true };
        }

        const updatedUsersStr = JSON.stringify(allUsersObj);
        if (updatedUsersStr) localStorage.setItem(LS_KEYS.users, updatedUsersStr);
      }
    }
  }

  const result = next(action);
  return result;
};
