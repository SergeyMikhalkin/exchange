type StringArray = string;

export type Bank = {
  filialId: string;
  weekShedule: StringArray;
  streetType: string;
  streetName: string;
  description: string;
  buildingNumber: string;
  cityName: string;
  cityType: string;
  favorite: boolean;
  usdIn?: string;
  usdOut?: string;
  eurIn?: string;
  eurOut?: string;
  rubIn?: string;
  rubOut?: string;
  gbrIn?: string;
  gbrOut?: string;
  cadIn?: string;
  cadOut?: string;
  plnIn?: string;
  plnOut?: string;
};
