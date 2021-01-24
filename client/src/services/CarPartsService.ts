import axios from 'axios';
import { ICarParts } from '../models/carParts';

const url = '/api/admin/carparts';

const CarPartsService = {
  getCarParts: () => axios.get<ICarParts>(url),
  addCarParts: (data: ICarParts) => axios.post<ICarParts>(url, data),
  updateCarParts: ({ id, ...rest }: ICarParts) => axios.put<ICarParts>(`${url}/${id}`, rest)
};

export default CarPartsService;
