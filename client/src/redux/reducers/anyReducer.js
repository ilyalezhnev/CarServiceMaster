import { CREATE } from '../actions/types';

const initialState = {
  any: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE:
      return { ...state, any: [...state.any, action.payload] };

    default:
      return state;
  }
}
