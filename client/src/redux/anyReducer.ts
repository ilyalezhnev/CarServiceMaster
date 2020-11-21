import { CREATE } from './types';

const initialState = {
  any: '',
};

export const anyReducer = (state: { any: any } = initialState, action: any) => {
  switch (action.type) {
    case CREATE:
      return { ...state, any: [...state.any, action.payload] };

    default:
      return state;
  }
};
