import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL, Bank, LS_KEYS, RawBank, Statuses } from 'shared';

type State = {
  entities: { [key: string]: Bank };
  status: Statuses;
};

const initialState: State = {
  entities: {},
  status: Statuses.idle,
};

export const fetchBanks = createAsyncThunk<Promise<Array<RawBank>>, string>(
  'banks/fetchBanks',
  async (searchString: string) => {
    const response = await fetch(`${BASE_URL}${searchString}`);
    return response.json();
  }
);

type FavoriteItem = {
  [key: string]: boolean;
};

function getFavoriteFromLocalStorage(filialId: string): boolean {
  const users = localStorage.getItem(LS_KEYS.users);
  const currentUser = localStorage.getItem(LS_KEYS.currentUser);
  if (!users || !currentUser) return false;

  const usersObj = JSON.parse(users);
  const user = usersObj[LS_KEYS.users][currentUser] ?? undefined;
  const favorites = user && user[LS_KEYS.favorites] ? user[LS_KEYS.favorites] : undefined;
  const mergedFavorites = Object.values(favorites) as Array<FavoriteItem>;
  const favoriteIds = mergedFavorites.map((x) => Object.keys(x)).flat();
  return favoriteIds.some((favoriteId) => favoriteId === filialId);
}

const transformData = (rawBank: RawBank): Bank => {
  const bankInfo: Bank = {
    filialId: rawBank.filial_id,
    weekShedule: rawBank.info_worktime,
    streetType: rawBank.street_type,
    streetName: rawBank.street,
    description: rawBank.filials_text,
    buildingNumber: rawBank.home_number,
    cityName: rawBank.name,
    cityType: rawBank.name_type,
    favorite: getFavoriteFromLocalStorage(rawBank.filial_id),
  };
  return bankInfo;
};

const banksSlice = createSlice({
  name: 'banks',
  initialState,
  reducers: {
    toggleFavorite(state, action) {
      const bank = state.entities[action.payload.filialId];
      if (bank) bank.favorite = !bank.favorite;
    },
    toggleFavorites(state, action) {
      const favorites = action.payload;
      if (Array.isArray(favorites)) {
        favorites.forEach((favorite) => {
          if (state.entities[favorite.toString()]) state.entities[favorite].favorite = true;
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanks.pending, (state) => {
        state.status = Statuses.loading;
      })
      .addCase(fetchBanks.fulfilled, (state, action) => {
        const newEntities: { [key: string]: Bank } = {};
        const payload = action.payload as unknown as RawBank[];

        if (payload.length) {
          payload.forEach((bank: RawBank) => {
            const transformedBank = transformData(bank);
            newEntities[transformedBank.filialId] = transformedBank;
          });
        }

        state.entities = newEntities;
        state.status = Statuses.succeeded;
      })
      .addCase(fetchBanks.rejected, (state) => {
        state.status = Statuses.failed;
      });
  },
});

export default banksSlice;

export const { toggleFavorite, toggleFavorites } = banksSlice.actions;

type RootState = {
  banks: {
    entities: { [key: string]: Bank };
    status: Statuses;
  };
};

export const getBanks = (state: RootState): Array<Bank> => Object.values(state.banks.entities);

export const getStatus = (state: RootState): Statuses => state.banks.status;
