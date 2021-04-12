import axios from 'axios';
import { IMainPage } from '../models/mainPage';

const url = '/api/admin/mainpage';

const MainPageService = {
  getMainPage: () => axios.get<IMainPage>(url),
  addMainPage: ({ id, ...rest }: IMainPage) => axios.post<IMainPage>(url, rest),
  updateMainPage: ({ id, ...rest }: IMainPage) => axios.put<IMainPage>(`${url}/${id}`, rest)
};

export default MainPageService;
