import { CREATE } from './types';

export function createAny(any) {
  return {
    type: CREATE,
    payload: any,
  };
}
