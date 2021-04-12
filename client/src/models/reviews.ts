import { createModel } from '@rematch/core';
import { IRootModel } from '.';
import ReviewsService from '../services/ReviewsService';

interface IState {
  data: IReviews[] | null;
}

const initialState: IState = {
  data: null
};

export interface IReviews {
  id: number;
  fullName: string;
  text: string;
  image: string;
}

export const reviews = createModel<IRootModel>()({
  state: initialState,
  reducers: {
    setRevies(state, data: IReviews[]): IState {
      return { ...state, data };
    }
  },
  effects: d => {
    return {
      async getReviews() {
        const { data } = await ReviewsService.getReviews();
        if (data) {
          d.reviews.setRevies(data);
        }
      },
      async addReviews(model: IReviews) {
        const { data } = await ReviewsService.addReviews(model);
        if (data) {
          d.reviews.getReviews();
        }
      },
      async updateReviews(model: IReviews) {
        const { data } = await ReviewsService.updateReviews(model);
        if (data) {
          d.reviews.getReviews();
        }
      },
      async deleteReviews(id: number) {
        const { data } = await ReviewsService.deleteReviews(id);
        if (data) {
          d.reviews.getReviews();
        }
      }
    };
  }
});
