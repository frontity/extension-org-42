import postPagination from '../postPagination';
import PaginationWaypoint from '../../components/PaginationWaypoint';

const { process, test: processorTest } = postPagination;

describe('Extension Organization 42 › PWA › Processors › postPagination', () => {
  test('Test returns true if the component is `h3` and ignore is false', () => {
    const result = processorTest({ component: 'h3' });
    expect(result).toBe(true);
  });

  test('Test returns false if the component is not `h3`', () => {
    const result = processorTest({ component: 'a' });
    expect(result).toBe(false);
  });

  test('Test returns false if the ignore is true', () => {
    const result = processorTest({ component: 'h3', ignore: true });
    expect(result).toBe(false);
  });

  test('Processor returns an element with the right values', () => {
    const result = process(
      {},
      {
        item: {
          entity: {
            type: 'post',
            id: 1,
            link: 'https://frontity.io/some-path.html',
            headMeta: { title: 'Title' },
          },
        },
        htmlTree: {},
      },
    );
    expect(result).toEqual({
      type: 'element',
      component: PaginationWaypoint,
      props: {
        page: 1,
        title: 'Title',
        url: 'https://frontity.io/some-path.html',
      },
      children: [
        {
          props: {
            'data-pagination-id': 'post_1_1',
          },
          ignore: true,
        },
      ],
    });
  });

  test('Processor increases the counter', () => {
    process(
      {},
      {
        item: {
          entity: {
            type: 'post',
            id: 1,
            link: 'https://frontity.io/some-path.html',
            headMeta: { title: 'Title' },
          },
        },
        htmlTree: {},
      },
    );
    expect(PaginationWaypoint.counter).toBe(2);
  });

  test('Processor resets the counter', () => {
    PaginationWaypoint.counter = 10;
    expect(PaginationWaypoint.counter).toBe(10);
    process(
      {},
      {
        item: {
          entity: {
            type: 'post',
            id: 1,
            link: 'https://frontity.io/some-path.html',
            headMeta: { title: 'Title' },
          },
        },
        htmlTree: {},
      },
    );
    expect(PaginationWaypoint.counter).toBe(2);
  });

  test('Processor sets lastHtmlTree', () => {
    PaginationWaypoint.counter = 10;
    expect(PaginationWaypoint.counter).toBe(10);
    const htmlTree = {};
    process(
      {},
      {
        item: {
          entity: {
            type: 'post',
            id: 1,
            link: 'https://frontity.io/some-path.html',
            headMeta: { title: 'Title' },
          },
        },
        htmlTree,
      },
    );
    expect(PaginationWaypoint.counter).toBe(2);
    expect(PaginationWaypoint.lastHtmlTree).toBe(htmlTree);
  });
  test('Processor increments counter if is the same htmlTree', () => {
    PaginationWaypoint.counter = 4;
    expect(PaginationWaypoint.counter).toBe(4);
    const htmlTree = {};
    PaginationWaypoint.lastHtmlTree = htmlTree;
    process(
      {},
      {
        item: {
          entity: {
            type: 'post',
            id: 1,
            link: 'https://frontity.io/some-path.html',
            headMeta: { title: 'Title' },
          },
        },
        htmlTree,
      },
    );
    expect(PaginationWaypoint.counter).toBe(5);
  });
});
