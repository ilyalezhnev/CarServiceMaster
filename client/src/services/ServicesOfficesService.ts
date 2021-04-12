import axios from 'axios';
import { IServiceOffice } from '../models/services';

const url = '/api/admin/servicesoffices';

const ServicesOfficesService = {
  addServicesOffices: (data: IServiceOffice) => axios.post<IServiceOffice>(url, data),
  updateServicesOffices: ({ id, ...rest }: IServiceOffice) => axios.put<IServiceOffice>(`${url}/${id}`, rest),
  deleteServicesOffices: (id: number) => axios.delete(`${url}/${id}`)
};

export default ServicesOfficesService;
