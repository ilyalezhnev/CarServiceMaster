import { createModel } from '@rematch/core';
import { IRootModel } from '.';
import PromosService from '../services/PromosService';

interface IState {
  data: IPromos[] | null;
}

const initialState: IState = {
  data: null
};

export interface IPromos {
  id: number;
  titleForMain: string;
  title: string;
  description: string;
  shortDescription: string;
}

export const promos = createModel<IRootModel>()({
  state: initialState,
  reducers: {
    setPromos(state, data: IPromos[]): IState {
      return { ...state, data };
    }
  },
  effects: d => {
    return {
      async getPromos() {
        const { data } = await PromosService.getPromos();
        if (data) {
          d.promos.setPromos(data);
        }
      },
      async addPromos(model: IPromos) {
        const { data } = await PromosService.addPromos(model);
        if (data) {
          d.promos.getPromos();
        }
      },
      async updatePromos(model: IPromos) {
        const { data } = await PromosService.updatePromos(model);
        if (data) {
          d.promos.getPromos();
        }
      },
      async deletePromos(id: number) {
        const { data } = await PromosService.deletePromos(id);
        if (data) {
          d.promos.getPromos();
        }
      }
    };
  }
});
