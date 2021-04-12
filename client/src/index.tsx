import React from 'react';
import ReactDOM from 'react-dom';
import axios, { AxiosResponse } from 'axios';
import 'antd/dist/antd.css';
import './index.css';
import App from './App';
import { message } from 'antd';

if (process && process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://ptzmaster.ru';
}
axios.interceptors.request.use(config => {
  config.headers.Authorization = localStorage.getItem('jwtToken');
  return config;
});
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const response: AxiosResponse<{ error: string }> = error.response;
    if (response && response.data && response.status) {
      switch (response.status) {
        case 422:
          message.error(response.data.error);
          break;
        case 500:
          message.error('Что-то пошло не так, обратитесь к администратору');
          break;

        default:
          break;
      }
    }
    return Promise.reject(error.response);
  }
);

ReactDOM.render(<App />, document.getElementById('root'));
