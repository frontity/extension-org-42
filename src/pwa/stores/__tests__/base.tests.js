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

  test('scrollToHeader should scroll to the element', () => {
    const store = Store.create({});

    Object.defineProperty(store.organization, 'root', {
      writable: true,
      value: {
        build: {
          initialUrl: 'https://frontity.io/some-path.html/3',
        },
        connection: {
          selectedItem: {
            type: 'post',
            id: 1,
          },
        },
      },
    });

    window.document.querySelector = jest.fn(() => ({
      getBoundingClientRect: jest.fn(() => ({
        top: 1000,
      })),
    }));
    window.scrollTo = jest.fn();

    store.organization.scrollToHeader();

    expect(window.document.querySelector).toHaveBeenCalledWith(
      "h3[data-pagination-id='post_1_3']",
    );
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 916 });
  });

  test("scrollToHeader should not scroll if the element doesn't exist", () => {
    const store = Store.create({});

    Object.defineProperty(store.organization, 'root', {
      writable: true,
      value: {
        build: {
          initialUrl: 'https://frontity.io/some-path.html/3',
        },
        connection: {
          selectedItem: {
            type: 'post',
            id: 1,
          },
        },
      },
    });

    window.document.querySelector = jest.fn(() => null);
    window.scrollTo = jest.fn();

    store.organization.scrollToHeader();

    expect(window.document.querySelector).toHaveBeenCalledWith(
      "h3[data-pagination-id='post_1_3']",
    );
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  test("scrollToHeader should not scroll if the url doesn't have a page", () => {
    const store = Store.create({});

    Object.defineProperty(store.organization, 'root', {
      writable: true,
      value: {
        build: {
          initialUrl: 'https://frontity.io/some-path.html',
        },
      },
    });

    window.document.querySelector = jest.fn();

    store.organization.scrollToHeader();

    expect(window.document.querySelector).not.toHaveBeenCalled();
  });
});
