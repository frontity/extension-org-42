import { types } from 'mobx-state-tree';
import Server from '../server';

const Store = types.model().props({
  organization: types.optional(Server, {}),
});

describe('Extension Organization 42 › PWA › Stores › Server', () => {
  test('beforeCsr should call addProcesors', () => {
    const store = Store.create({});
    const addProcessors = jest.fn();

    Object.defineProperty(store.organization, 'addProcessors', {
      writable: true,
      value: addProcessors,
    });

    store.organization.beforeSsr();

    expect(addProcessors).toHaveBeenCalledTimes(1);
  });
});
