import { createModel } from '@rematch/core';
import { IRootModel } from '.';
import ServicesOfficesService from '../services/ServicesOfficesService';
import ServicesService from '../services/ServicesService';
import { IOffices } from './offices';

interface IState {
  data: IServicesFromServer[] | null;
}

const initialState: IState = {
  data: null
};

export interface IServices {
  id: number;
  title: string;
  cost: string;
  description: string;
  text: string;
  image: string;
  icon: string;
}
export interface IServicesForm extends IServices {
  officesIds: number[];
}
export interface IServiceOffice {
  id?: number;
  isAvailable: boolean;
  serviceId: number;
  officeId: number;
}
export interface IServicesOffices extends IOffices {
  serviceOffice: IServiceOffice;
}
export interface IServicesFromServer extends IServices {
  offices: IServicesOffices[];
}
export interface IServicesToServer extends IServices {
  servicesOffices: { id?: number; officeId: number; isAvailable: boolean }[];
}

export const services = createModel<IRootModel>()({
  state: initialState,
  reducers: {
    setServices(state, data: IServicesFromServer[]): IState {
      return { ...state, data };
    }
  },
  effects: d => {
    return {
      async getServices() {
        const { data } = await ServicesService.getServices();
        if (data) {
          d.services.setServices(data);
        }
      },
      async addServices(model: IServicesToServer) {
        const { servicesOffices, ...rest } = model;
        const { data } = await ServicesService.addServices(rest);
        await Promise.all(
          servicesOffices.map(serviceOffice => {
            return ServicesOfficesService.addServicesOffices({
              officeId: serviceOffice.officeId,
              serviceId: data.id,
              isAvailable: serviceOffice.isAvailable
            });
          })
        ).then(() => {
          if (data) {
            d.services.getServices();
          }
        });
      },
      async updateServices(model: IServicesToServer) {
        const { servicesOffices, ...rest } = model;
        const { data } = await ServicesService.updateServices(rest);
        await Promise.all(
          servicesOffices.map(serviceOffice => {
            return ServicesOfficesService.updateServicesOffices({
              id: serviceOffice.id,
              officeId: serviceOffice.officeId,
              serviceId: data.id,
              isAvailable: serviceOffice.isAvailable
            });
          })
        ).then(() => {
          if (data) {
            d.services.getServices();
          }
        });
      },
      async deleteServices(id: number) {
        const { data } = await ServicesService.deleteServices(id);
        if (data) {
          d.services.getServices();
        }
      }
    };
  }
});
