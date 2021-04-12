import axios from 'axios';
import { ICorporateClients, ICorporateClientsFromServer } from '../models/corporateClients';

const url = '/api/admin/corporateclients';

const CorporateClientsService = {
  getCorporateClients: () => axios.get<ICorporateClientsFromServer>(url),
  addCorporateClients: (data: ICorporateClients) => axios.post<ICorporateClients>(url, data),
  updateCorporateClients: ({ id, ...rest }: ICorporateClients) => axios.put<ICorporateClients>(`${url}/${id}`, rest)
};

export default CorporateClientsService;
