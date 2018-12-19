import { types, getParent, getEnv } from 'mobx-state-tree';

export default types.model('Organization').actions(self => ({
  addProcessors() {
    const { h2r } = getParent(self, 1).theme;
    const { processors } = getEnv(self).organization;

    processors.forEach(proc => h2r.addProcessor(proc, 'low'));
  },
}));
