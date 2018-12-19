import { types } from 'mobx-state-tree';
import Client from '../client';

const Store = types.model().props({
  organization: types.optional(Client, {}),
});

describe('Extension Organization 42 › PWA › Stores › Client', () => {
  test('beforeCsr should call addProcesors', () => {
    const store = Store.create({});
    const addProcessors = jest.fn();

    Object.defineProperty(store.organization, 'addProcessors', {
      writable: true,
      value: addProcessors,
    });

    store.organization.beforeCsr();

    expect(addProcessors).toHaveBeenCalledTimes(1);
  });
});
