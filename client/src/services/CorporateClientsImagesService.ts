import axios from 'axios';
import { ICorporateClientImage } from '../models/corporateClientsImages';

const url = '/api/admin/corporateclientsimages';

const CorporateClientsImagesService = {
  addCorporateClientsImages: (data: ICorporateClientImage) => axios.post<ICorporateClientImage>(url, data)
};

export default CorporateClientsImagesService;
