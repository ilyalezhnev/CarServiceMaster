import axios from 'axios';
import { IReviews } from '../models/reviews';

const url = '/api/admin/reviews';

const ReviewsService = {
  getReviews: () => axios.get<IReviews[]>(url),
  addReviews: (data: IReviews) => axios.post<IReviews>(url, data),
  updateReviews: ({ id, ...rest }: IReviews) => axios.put<IReviews>(`${url}/${id}`, rest),
  deleteReviews: (id: number) => axios.delete(`${url}/${id}`)
};

export default ReviewsService;
