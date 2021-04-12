import { createModel } from '@rematch/core';
import { IRootModel } from '.';
import MainPageService from '../services/MainPageService';

interface IState {
  data: IMainPage | null;
}

const initialState: IState = {
  data: null
};

export interface IMainPage {
  id: number;
  title: string;
  subtitle: string;
  serviceDescription: string;
}

export const mainPage = createModel<IRootModel>()({
  state: initialState,
  reducers: {
    setMainPage(state, data: IMainPage): IState {
      return { ...state, data };
    }
  },
  effects: d => {
    return {
      async getMainPage() {
        const { data } = await MainPageService.getMainPage();
        if (data) {
          d.mainPage.setMainPage(data);
        }
      },
      async addMainPage(model: IMainPage) {
        const { data } = await MainPageService.addMainPage(model);
        if (data) {
          d.mainPage.getMainPage();
        }
      },
      async updateMainPage(model: IMainPage) {
        const { data } = await MainPageService.updateMainPage(model);
        if (data) {
          d.mainPage.getMainPage();
        }
      }
    };
  }
});
