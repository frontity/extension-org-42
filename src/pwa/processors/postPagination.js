import PaginationWaypoint from '../components/PaginationWaypoint';

export default {
  test: ({ component, ignore }) => !ignore && component === 'h3',
  process: (
    element,
    {
      item: {
        entity: {
          type,
          id,
          link,
          headMeta: { title },
        },
      },
      htmlTree,
    },
  ) => {
    if (PaginationWaypoint.lastHtmlTree !== htmlTree) {
      PaginationWaypoint.counter = 1;
      PaginationWaypoint.lastHtmlTree = htmlTree;
    }

    const page = PaginationWaypoint.counter;
    PaginationWaypoint.counter += 1;

    return {
      type: 'element',
      component: PaginationWaypoint,
      props: {
        page,
        title,
        url: link,
      },
      children: [
        {
          ...element,
          props: {
            ...element.props,
            'data-pagination-id': `${type}_${id}_${page}`,
          },
          ignore: true,
        },
      ],
    };
  },
};
