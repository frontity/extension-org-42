import { types } from 'mobx-state-tree';
import Base from '../base';

const Store = types.model().props({
  organization: types.optional(Base, {}),
});

describe('Extension Organization 42 › PWA › Stores › Base', () => {
  test('addProcesors should call h2r.addProcessor three times', () => {
    const store = Store.create({}, { organization: { processors: [1, 2, 3] } });
    const addProcessor = jest.fn();

    Object.defineProperty(store, 'theme', {
      writable: true,
      value: {
        h2r: {
          addProcessor,
        },
      },
    });

    store.organization.addProcessors();

    expect(addProcessor).toHaveBeenCalledTimes(3);
  });

  test("addProcesors should call h2r.addProcessor with 'low' priority", () => {
    const processor = { test: () => {}, process: () => {} };
    const store = Store.create(
      {},
      { organization: { processors: [processor] } },
    );
    const addProcessor = jest.fn();

    Object.defineProperty(store, 'theme', {
      writable: true,
      value: {
        h2r: {
          addProcessor,
        },
      },
    });

    store.organization.addProcessors();

    expect(addProcessor).toHaveBeenCalledWith(processor, 'low');
  });
});
