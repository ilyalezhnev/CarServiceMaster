import { Models } from '@rematch/core';
import { auth } from './auth';
import { carParts } from './carParts';
import { offices } from './offices';
import { carPartsOffices } from './carPartsOffices';
import { promos } from './promos';
import { reviews } from './reviews';
import { mainPage } from './mainPage';
import { services } from './services';
import { corporateClientsImages } from './corporateClientsImages';
import { corporateClients } from './corporateClients';
import { uploads } from './uploads';

export interface IRootModel extends Models<IRootModel> {
  auth: typeof auth;
  carParts: typeof carParts;
  offices: typeof offices;
  carPartsOffices: typeof carPartsOffices;
  promos: typeof promos;
  reviews: typeof reviews;
  mainPage: typeof mainPage;
  services: typeof services;
  corporateClients: typeof corporateClients;
  corporateClientsImages: typeof corporateClientsImages;
  uploads: typeof uploads;
}
const rootModel: IRootModel = {
  auth,
  carParts,
  offices,
  carPartsOffices,
  promos,
  reviews,
  mainPage,
  services,
  corporateClients,
  corporateClientsImages,
  uploads
};

export default rootModel;
