import { createModel } from '@rematch/core';
import { IRootModel } from '.';
import CarPartsService from '../services/CarPartsService';
import { IOficesCarparts } from './offices';

interface IState {
  data: ICarParts | null;
}

const initialState: IState = {
  data: null
};

export interface ICarParts {
  id: number;
  title: string;
  subtitle: string;
  offices: IOficesCarparts[];
}

export const carParts = createModel<IRootModel>()({
  state: initialState,
  reducers: {
    setCarParts(state, data: ICarParts): IState {
      const offices = state.data ? state.data.offices : [];
      const carParts = { ...data, offices: data.offices ? data.offices : offices };
      return { ...state, data: carParts };
    }
  },
  effects: d => {
    return {
      async getCarParts() {
        const { data } = await CarPartsService.getCarParts();
        if (data) {
          d.carParts.setCarParts(data);
        }
      },
      async addCarParts(model: ICarParts) {
        const { data } = await CarPartsService.addCarParts(model);
        if (data) {
          d.carParts.setCarParts(data);
        }
      },
      async updateCarParts(model: ICarParts) {
        const { data } = await CarPartsService.updateCarParts(model);
        if (data) {
          d.carParts.setCarParts(data);
        }
      }
    };
  }
});
