import Waypoint from 'react-waypoint';

let counter = 1;
let lastPageEntered = 1;
let lastHtmlTree = {};

export default {
  test: ({ component, ignore }) => !ignore && component === 'h3',
  process: (
    element,
    { stores: { connection, analytics }, item: { type, id }, htmlTree },
  ) => {
    // Resets the counter for each cycle of H2R.
    if (lastHtmlTree !== htmlTree) {
      counter = 1;
      lastHtmlTree = htmlTree;
    }

    const page = counter;
    counter += 1;

    return {
      type: 'element',
      component: Waypoint,
      props: {
        bottomOffset: '40%',
        scrollableAncestor: 'window',
        onEnter: () => {
          if (lastPageEntered === page) return;

          lastPageEntered = page;

          const initialTitle = connection.head.title;
          const initialTitleHasPage = initialTitle.includes('- Página');
          const titlePage = page > 1 ? ` - Página ${page}` : '';
          const pageview = {
            location: `${connection.selectedItem.entity.link}${
              page > 1 ? `/${page}` : ''
            }`,
          };

          if (initialTitleHasPage) {
            pageview.title = initialTitle.replace(/ - Página \d+$/, titlePage);
          } else {
            pageview.title = `${connection.head.title}${titlePage}`;
          }

          analytics.sendPageView(pageview);
        },
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
