import { Middleware } from '@reduxjs/toolkit';
import { LS_KEYS } from 'shared';

export const saveHistoryMiddleware: Middleware = () => (next) => (action) => {
  const { payload } = action;

  if (payload && Array.isArray(payload) && payload.length > 0) {
    const currentUser = localStorage.getItem(LS_KEYS.currentUser);

    if (currentUser) {
      const allUsersStr = localStorage.getItem(LS_KEYS.users) ?? '';
      const allUsersObj = JSON.parse(allUsersStr) ?? {};

      if (
        JSON.stringify(allUsersObj) !== '{}' &&
        allUsersObj[LS_KEYS.users] &&
        allUsersObj[LS_KEYS.users][currentUser] &&
        allUsersObj[LS_KEYS.users][currentUser][LS_KEYS.history]
      ) {
        const historyItem = { searchString: action.meta.arg, dateTime: Date.now().toString() };

        allUsersObj[LS_KEYS.users][currentUser][LS_KEYS.history] = [
          historyItem,
          ...allUsersObj[LS_KEYS.users][currentUser][LS_KEYS.history],
        ];

        const updatedUsersStr = JSON.stringify(allUsersObj);
        if (updatedUsersStr) localStorage.setItem(LS_KEYS.users, updatedUsersStr);
      }
    }
  }
  const result = next(action);
  return result;
};
