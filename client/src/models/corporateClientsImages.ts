import { createModel } from '@rematch/core';
import { IRootModel } from '.';
import CorporateClientsImagesService from '../services/CorporateClientsImagesService';

interface IState {
  data: ICorporateClientImage | null;
}

const initialState: IState = {
  data: null
};

export interface ICorporatesClientImages {
  filename: string;
  extension: string;
  url: string;
  corporateClientImage: ICorporateClientImage;
}

export interface ICorporateClientImage {
  id?: number;
  corporateClientId: number;
  imageId: number;
}

export const corporateClientsImages = createModel<IRootModel>()({
  state: initialState,
  reducers: {},
  effects: d => {
    return {
      async addCorporateClientsImages(model: ICorporateClientImage) {
        const { data } = await CorporateClientsImagesService.addCorporateClientsImages(model);
        if (data) {
          d.corporateClients.getCorporateClients();
        }
      },
      async deleteCorporateClientsImages(imageId: number) {
        const { status } = await d.uploads.deleteImage(imageId);
        if (status === 200) {
          d.corporateClients.getCorporateClients();
        }
      }
    };
  }
});
