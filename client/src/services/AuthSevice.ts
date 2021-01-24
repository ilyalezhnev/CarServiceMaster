import axios from 'axios';
import { IAuth, IUserLogin } from '../models/auth';

const url = '/api/auth';

const AuthSevice = {
  login: (params: IUserLogin) => axios.post<IAuth>(`${url}/login`, params)
};

export default AuthSevice;
