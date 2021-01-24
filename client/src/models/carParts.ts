import { createModel } from '@rematch/core';
import { IRootModel } from '.';
import CarPartsService from '../services/CarPartsService';

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
}

export const carParts = createModel<IRootModel>()({
  state: initialState,
  reducers: {
    setCarParts(state, data: ICarParts): IState {
      return { ...state, data };
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
