export const LS_KEYS = {
  users: 'users',
  favorites: 'favorites',
  history: 'history',
  currentUser: 'currentUser',
};

export const LS_USER_INITIAL_STATE = {
  [LS_KEYS.favorites]: {},
  [LS_KEYS.history]: [],
};

export const BASE_URL = 'https://belarusbank.by/api/kursExchange?city=';
