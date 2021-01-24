import { createModel } from '@rematch/core';
import { push } from 'connected-react-router';
import jwt_decode from 'jwt-decode';
import { IRootModel } from '.';
import AuthSevice from '../services/AuthSevice';

interface IState {
  isAuth: boolean;
  errors: any;
}

const initialState: IState = {
  isAuth: false,
  errors: null
};

export interface IAuth {
  succces: boolean;
  token: string;
}

export interface IUserLogin {
  login: string;
  password: string;
}

export const auth = createModel<IRootModel>()({
  state: initialState,
  reducers: {
    login(state): IState {
      return { ...state, isAuth: true };
    },
    logout(state): IState {
      return { ...state, isAuth: false };
    }
  },
  effects: d => {
    return {
      async onLogin(params: IUserLogin) {
        const { data } = await AuthSevice.login(params);
        if (data.succces) {
          localStorage.setItem('jwtToken', data.token);
          d.auth.login();
        }
      },
      async onLogout() {
        localStorage.removeItem('jwtToken');
        d(push('/'));
        d.auth.logout();
      }
    };
  }
});
