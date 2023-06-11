import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL_RTK, Bank, RawBank } from 'shared';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL_RTK }),
  endpoints: (builder) => ({
    getBanks: builder.query<Array<Bank>, void>({
      query: () => '',
      transformResponse: (rawBanks: RawBank[]): Bank[] => {
        const banks = rawBanks.map((rawBank) => {
          const bank = {
            filialId: rawBank.filial_id,
            weekShedule: rawBank.info_worktime,
            streetType: rawBank.street_type,
            streetName: rawBank.street,
            description: rawBank.filials_text,
            buildingNumber: rawBank.home_number,
            cityName: rawBank.name,
            cityType: rawBank.name_type,
            favorite: true,
          };
          return bank;
        });
        return banks;
      },
    }),
    getBanksFullDetails: builder.query<Array<Bank>, void>({
      query: () => '',
      transformResponse: (rawBanks: RawBank[]): Bank[] => {
        const banks = rawBanks.map((rawBank) => {
          const bank = {
            filialId: rawBank.filial_id,
            weekShedule: rawBank.info_worktime,
            streetType: rawBank.street_type,
            streetName: rawBank.street,
            description: rawBank.filials_text,
            buildingNumber: rawBank.home_number,
            cityName: rawBank.name,
            cityType: rawBank.name_type,
            favorite: false,
            usdIn: rawBank.USD_in,
            usdOut: rawBank.USD_out,
            eurIn: rawBank.EUR_in,
            eurOut: rawBank.EUR_out,
            rubIn: rawBank.RUB_in,
            rubOut: rawBank.RUB_in,
            gbrIn: rawBank.GBR_in,
            gbrOut: rawBank.GBR_out,
            cadIn: rawBank.CAD_in,
            cadOut: rawBank.CAD_out,
            plnIn: rawBank.PLN_in,
            plnOut: rawBank.PLN_out,
          };
          return bank;
        });
        return banks;
      },
    }),
  }),
});

export const { useGetBanksQuery, useGetBanksFullDetailsQuery } = apiSlice;
