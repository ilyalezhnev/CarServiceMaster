import axios from 'axios';

const url = '/api/admin/uploads';

const UploadsService = {
  deleteImage: (imageId: number) => axios.delete(`${url}/${imageId}`)
};

export default UploadsService;
