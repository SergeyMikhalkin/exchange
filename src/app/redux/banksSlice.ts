import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL, BASE_URL_RTK, Bank, RawBank, Statuses } from 'shared';

type State = {
  entities: { [key: string]: Bank };
  favorites: { [key: string]: boolean };
  all: { [key: string]: Bank };
  status: Statuses;
};

const initialState: State = {
  entities: {},
  favorites: {},
  all: {},
  status: Statuses.idle,
};

export const fetchBanks = createAsyncThunk<Promise<Array<RawBank>>, string>(
  'banks/fetchBanks',
  async (searchString: string) => {
    const response = await fetch(`${BASE_URL}${searchString}`);
    return response.json();
  }
);

export const fetchAllBanks = createAsyncThunk<Promise<Array<RawBank>>, void>(
  'banks/fetchAllBanks',
  async () => {
    const response = await fetch(BASE_URL_RTK);
    return response.json();
  }
);

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
  };
  return bankInfo;
};

const banksSlice = createSlice({
  name: 'banks',
  initialState,
  reducers: {
    toggleFavorite(state, action) {
      const { filialId } = action.payload;
      if (!state.entities[filialId].favorite) {
        state.entities[filialId].favorite = true;
      } else {
        state.entities[filialId].favorite = !state.entities[filialId].favorite;
      }

      if (state.favorites[filialId]) delete state.favorites[filialId];
      else state.favorites[filialId] = true;
    },
    toggleFavorites(state, action) {
      const favorites = action.payload;
      if (Array.isArray(favorites)) {
        favorites.forEach((favorite) => {
          if (state.entities[favorite.toString()]) state.entities[favorite].favorite = true;
        });
      }
    },
    fillFavorites(state, action) {
      const favorites = action.payload as string[];
      favorites.forEach((item) => {
        state.favorites[item] = true;
      });
    },
    fillDataFromRTKQuery(state, action) {
      const banks = action.payload as unknown as Bank[];
      const newEntities: { [key: string]: Bank } = {};

      if (banks && banks.length) {
        banks.forEach((bank: Bank) => {
          newEntities[bank.filialId] = bank;
        });
      }

      state.entities = newEntities;
    },
    resetState(state) {
      state.entities = {};
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
        state.all = { ...state.all, ...newEntities };

        const banks = Object.values(state.entities);
        banks.forEach((bank) => {
          bank.favorite = state.favorites[bank.filialId] !== undefined;
        });

        state.status = Statuses.succeeded;
      })
      .addCase(fetchBanks.rejected, (state) => {
        state.status = Statuses.failed;
      })
      .addCase(fetchAllBanks.fulfilled, (state, action) => {
        const newEntities: { [key: string]: Bank } = {};
        const payload = action.payload as unknown as RawBank[];

        if (payload.length) {
          payload.forEach((bank: RawBank) => {
            const transformedBank = transformData(bank);
            newEntities[transformedBank.filialId] = transformedBank;
          });
        }

        state.entities = newEntities;
        state.all = { ...state.all, ...newEntities };

        const banks = Object.values(state.entities);
        banks.forEach((bank) => {
          bank.favorite = state.favorites[bank.filialId] !== undefined;
        });
      });
  },
});

export default banksSlice;

export const { toggleFavorite, toggleFavorites, fillFavorites, fillDataFromRTKQuery, resetState } =
  banksSlice.actions;

export type RootState = {
  banks: {
    entities: { [key: string]: Bank };
    favorites: { [key: string]: boolean };
    all: { [key: string]: Bank };
    status: Statuses;
  };
};

export const getBanks = (state: RootState): Array<Bank> => Object.values(state.banks.entities);

export const getStatus = (state: RootState): Statuses => state.banks.status;

export const getAllBanks = (state: RootState): Array<Bank> => Object.values(state.banks.all);

export const getFavorites = (state: RootState): { [key: string]: boolean } => state.banks.favorites;

export const getFavoriteBanks = (state: RootState): Bank[] => {
  const favoriteIds = Object.keys(state.banks.favorites);
  const favoriteBanks = new Array<Bank>();
  favoriteIds.forEach((id) => {
    if (state.banks.entities[id]) favoriteBanks.push(state.banks.entities[id]);
  });
  return favoriteBanks;
};
