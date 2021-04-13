import { createModel } from '@rematch/core';
import { IRootModel } from '.';
import CorporateClientsService from '../services/CorporateClientsService';
import { ICorporatesClientImages } from './corporateClientsImages';

interface IState {
  data: ICorporateClientsFromServer | null;
}

const initialState: IState = {
  data: null
};

export interface ICorporateClients {
  id?: number;
  title: string;
  description: string;
  info: string;
}

export interface ICorporateClientsFromServer extends ICorporateClients {
  images: ICorporatesClientImages[];
}

export const corporateClients = createModel<IRootModel>()({
  state: initialState,
  reducers: {
    setCorporateClients(state, data: ICorporateClientsFromServer): IState {
      return { ...state, data };
    }
  },
  effects: d => {
    return {
      async getCorporateClients() {
        const { data } = await CorporateClientsService.getCorporateClients();
        if (data) {
          d.corporateClients.setCorporateClients(data);
        }
      },
      async addCorporateClients(model: ICorporateClients) {
        const { data } = await CorporateClientsService.addCorporateClients(model);
        if (data) {
          d.corporateClients.getCorporateClients();
        }
      },
      async updateCorporateClients(model: ICorporateClients) {
        const { data } = await CorporateClientsService.updateCorporateClients(model);
        if (data) {
          d.corporateClients.getCorporateClients();
        }
      }
    };
  }
});
