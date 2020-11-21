import { CREATE } from './types';

export function createAny(any: any) {
  return {
    type: CREATE,
    payload: any,
  };
}
