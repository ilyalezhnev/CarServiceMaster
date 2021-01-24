import { Models } from '@rematch/core';
import { auth } from './auth';
import { carParts } from './carParts';

export interface IRootModel extends Models<IRootModel> {
  auth: typeof auth;
  carParts: typeof carParts;
}
const rootModel: IRootModel = { auth, carParts };

export default rootModel;
