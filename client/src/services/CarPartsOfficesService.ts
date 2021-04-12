import axios from 'axios';
import { ICarParts } from '../models/carParts';
import { ICarPartsOffices } from '../models/carPartsOffices';

const url = '/api/admin/carpartsoffices';

const CarPartsOfficesService = {
  addCarPartsOffices: (data: ICarPartsOffices) => axios.post<ICarParts>(url, data),
  updateCarPartsOffices: ({ id, ...rest }: ICarPartsOffices) => axios.put<ICarPartsOffices>(`${url}/${id}`, rest),
  deleteCarPartsOffices: (id: number) => axios.delete(`${url}/${id}`)
};

export default CarPartsOfficesService;
