import { createModel } from '@rematch/core';
import { IRootModel } from '.';
import OfficesService from '../services/OfficesService';
import { ICarPartsOffices } from './carPartsOffices';

interface IState {
  data: IOffices[] | null;
}

const initialState: IState = {
  data: null,
};

export interface IOffices {
  id: number;
  address: string;
  fullAddress: string;
  tel: string;
  fullTel: string;
  telegram: string;
  viber: string;
  whatsapp: string;
  description: string;
  email: string;
  locationLat: string;
  locationLon: string;
  workingHours: string;
}
export interface IOfficesForm extends IOffices {
  location: { lat: number; lng: number };
}

export interface IOficesCarparts extends IOffices {
  carPartOffice: ICarPartsOffices;
}

export const offices = createModel<IRootModel>()({
  state: initialState,
  reducers: {
    setOffices(state, data: IOffices[]): IState {
      return { ...state, data };
    },
  },
  effects: (d) => {
    return {
      async getOffices() {
        const { data } = await OfficesService.getOffices();
        if (data) {
          d.offices.setOffices(data);
        }
      },
      async addOffices(model: IOffices) {
        const { data } = await OfficesService.addOffices(model);
        if (data) {
          d.offices.getOffices();
        }
      },
      async updateOffices(model: IOffices) {
        const { data } = await OfficesService.updateOffices(model);
        if (data) {
          d.offices.getOffices();
        }
      },
      async deleteOffices(id: number) {
        const { data } = await OfficesService.deleteOffices(id);
        if (data) {
          d.offices.getOffices();
        }
      },
    };
  },
});
