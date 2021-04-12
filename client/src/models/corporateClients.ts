import { createModel } from '@rematch/core';
import { UploadFile } from 'antd/lib/upload/interface';
import { IRootModel } from '.';
import { imageGalaryMapper } from '../mappers/imageGalaryMapper';
import CorporateClientsService from '../services/CorporateClientsService';
import { ICorporatesClientImages, IImageGalaryUpload } from './corporateClientsImages';
import { IUploads } from './uploads';

interface IState {
  data: ICorporateClientsFromServerForImageGalaryUpload | null;
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
export interface ICorporateClientsFromServerForImageGalaryUpload extends ICorporateClientsFromServer {
  imagesMaped: UploadFile<IUploads>[];
}

export const corporateClients = createModel<IRootModel>()({
  state: initialState,
  reducers: {
    setCorporateClients(state, data: ICorporateClientsFromServerForImageGalaryUpload): IState {
      return { ...state, data };
    }
  },
  effects: d => {
    return {
      async getCorporateClients() {
        const { data } = await CorporateClientsService.getCorporateClients();
        if (data) {
          d.corporateClients.setCorporateClients(imageGalaryMapper(data));
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
