import { createModel } from '@rematch/core';
import { IRootModel } from '.';
import UploadsService from '../services/UploadsService';

interface IState {
  data: IUploads | null;
}

const initialState: IState = {
  data: null
};

export interface IUploads {
  id: number;
  extension: string;
  filename: string;
  url: string;
}

export const uploads = createModel<IRootModel>()({
  state: initialState,
  reducers: {},
  effects: d => {
    return {
      async deleteImage(imageId: number) {
        return UploadsService.deleteImage(imageId);
      }
    };
  }
});
