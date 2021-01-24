import { init, RematchDispatch, RematchRootState } from '@rematch/core';
import { createBrowserHistory } from 'history';
import createLoadingPlugin from '@rematch/loading';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import models, { IRootModel } from '../models';

export const history = createBrowserHistory();

const loadingPlugin = createLoadingPlugin<IRootModel>({ asNumber: false });
const router = connectRouter(history);

export const store = init({
  plugins: [loadingPlugin],
  models,
  redux: {
    rootReducers: {
      resetStore: () => undefined
    },
    middlewares: [routerMiddleware(history)],
    reducers: {
      router
    }
  }
});

interface ILoadingPlugin {
  loading: {
    global: boolean;
    models: RematchRootState<IRootModel>;
    effects: Dispatch;
  };
}

interface IConnectedRouter {
  router: {
    location: {
      pathname: string;
      search: string;
      hash: string;
      key: string;
      query: { [key: string]: string };
    };
  };
}

export type Store = typeof store;
export type Dispatch = RematchDispatch<IRootModel>;
export type IRootState = RematchRootState<IRootModel> & ILoadingPlugin & IConnectedRouter;
export const dispatchResetStore = () => store.dispatch({ type: 'resetStore' });
