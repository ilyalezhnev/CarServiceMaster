import axios from 'axios';
import { IServices, IServicesFromServer } from '../models/services';

const url = '/api/admin/services';

const ServicesService = {
  getServices: () => axios.get<IServicesFromServer[]>(url),
  addServices: (data: IServices) => axios.post<IServicesFromServer>(url, data),
  updateServices: ({ id, ...rest }: IServices) => axios.put<IServicesFromServer>(`${url}/${id}`, rest),
  deleteServices: (id: number) => axios.delete(`${url}/${id}`)
};

export default ServicesService;
