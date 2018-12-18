import base from './base';

export default base.actions(self => ({
  beforeSsr() {
    self.addProcessors();
  },
}));
