import axios from 'axios';
import { IOffices } from '../models/offices';

const url = '/api/admin/offices';

const OfficesService = {
  getOffices: () => axios.get<IOffices[]>(url),
  addOffices: (data: IOffices) => axios.post<IOffices>(url, data),
  updateOffices: ({ id, ...rest }: IOffices) => axios.put<IOffices>(`${url}/${id}`, rest),
  deleteOffices: (id: number) => axios.delete(`${url}/${id}`)
};

export default OfficesService;
