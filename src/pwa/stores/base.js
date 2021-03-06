import { types, getParent, getEnv } from 'mobx-state-tree';

export default types
  .model('Organization')
  .views(self => ({
    get root() {
      return getParent(self, 1);
    },
  }))
  .actions(self => ({
    addProcessors() {
      const { h2r } = self.root.theme;
      const { processors } = getEnv(self).organization;

      processors.forEach(proc => h2r.addProcessor(proc, 'low'));
    },
    scrollToHeader() {
      const { initialUrl } = self.root.build;
      const [, page] = initialUrl.match(/\/(\d+)$/) || [null, null];

      if (page) {
        const { type, id } = self.root.connection.selectedItem;
        const element = window.document.querySelector(
          `h3[data-pagination-id='${type}_${id}_${page}']`,
        );

        if (element) {
          // Calculates the scroll amount needed: distance from top minus navbar height.
          const scrollAmount = element.getBoundingClientRect().top - 84;
          window.scrollTo({ top: scrollAmount });
        }
      }
    },
  }));
