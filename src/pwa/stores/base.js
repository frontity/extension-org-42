import { types, getParent } from 'mobx-state-tree';
import procs from '../processors';

export default types.model('Org42').actions(self => ({
  addProcessors() {
    const { h2r } = getParent(self, 1).theme;

    procs.forEach(proc => h2r.addProcessor(proc, 'low'));
  },
}));
