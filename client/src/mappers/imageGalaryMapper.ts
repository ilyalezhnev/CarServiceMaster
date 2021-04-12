import { ICorporateClientsFromServer, ICorporateClientsFromServerForImageGalaryUpload } from '../models/corporateClients';

export const imageGalaryMapper = (data: ICorporateClientsFromServer): ICorporateClientsFromServerForImageGalaryUpload => {
  return {
    ...data,
    imagesMaped: data.images.map(image => ({
      uid: image.filename,
      size: 10,
      name: image.filename,
      type: 'done',
      url: image.url,
      response: {
        id: image.corporateClientImage.imageId,
        extension: image.extension,
        filename: image.filename,
        url: image.url
      }
    }))
  };
};
