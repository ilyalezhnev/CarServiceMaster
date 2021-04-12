import axios from 'axios';
import { IPromos } from '../models/promos';

const url = '/api/admin/promos';

const PromosService = {
  getPromos: () => axios.get<IPromos[]>(url),
  addPromos: (data: IPromos) => axios.post<IPromos>(url, data),
  updatePromos: ({ id, ...rest }: IPromos) => axios.put<IPromos>(`${url}/${id}`, rest),
  deletePromos: (id: number) => axios.delete(`${url}/${id}`)
};

export default PromosService;
