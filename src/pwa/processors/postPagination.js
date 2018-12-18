import Waypoint from 'react-waypoint';

let counter = 1;
let lastPageEntered = 1;

export default {
  test: ({ component, ignore }) => !ignore && component === 'h3',
  process: element => {
    const page = counter;
    counter += 1;

    return {
      type: 'element',
      component: Waypoint,
      props: {
        bottomOffset: '40%',
        topOffset: '20%',
        scrollableAncestor: 'window',
        fireOnRapidScroll: true,
        onEnter: () => {
          if (lastPageEntered === page) return;

          lastPageEntered = page;

          console.log('entered page', page);
        },
      },
      children: [{ ...element, ignore: true }],
    };
  },
};
