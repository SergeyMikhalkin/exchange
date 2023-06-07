import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL, Bank, RawBank, Statuses } from 'shared';

const initialState = {
  entities: {},
  status: Statuses.idle,
};

export const fetchBanks = createAsyncThunk('banks/fetchBanks', async (searchString: string) => {
  const response = await fetch(`${BASE_URL}${searchString}`);
  return response.json();
});

const transformData = (rawBank: RawBank) => {
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
  reducers: {},
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

type RootState = {
  banks: {
    entities: { [key: string]: Bank };
    status: Statuses;
  };
};

export const getBanks = (state: RootState) => Object.values(state.banks.entities);

export const getStatus = (state: RootState) => state.banks.status;
