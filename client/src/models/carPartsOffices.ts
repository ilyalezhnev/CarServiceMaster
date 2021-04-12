import { createModel } from '@rematch/core';
import { IRootModel } from '.';
import CarPartsOfficesService from '../services/CarPartsOfficesService';

interface IState {
  data: ICarPartsOffices | null;
}

const initialState: IState = {
  data: null
};

export interface ICarPartsOffices {
  id: number;
  description: string;
  image: string;
  carPartId: number;
  officeId: number;
}

export const carPartsOffices = createModel<IRootModel>()({
  state: initialState,
  reducers: {},
  effects: d => {
    return {
      async addCarPartsOffices(model: ICarPartsOffices) {
        const { data } = await CarPartsOfficesService.addCarPartsOffices(model);
        if (data) {
          d.carParts.getCarParts();
        }
      },
      async updateCarPartsOffices(model: ICarPartsOffices) {
        const { data } = await CarPartsOfficesService.updateCarPartsOffices(model);
        if (data) {
          d.carParts.getCarParts();
        }
      },
      async deleteCarPartsOffices(id: number) {
        const { data } = await CarPartsOfficesService.deleteCarPartsOffices(id);
        if (data) {
          d.carParts.getCarParts();
        }
      }
    };
  }
});
