import base from './base';

export default base.actions(self => ({
  beforeCsr() {
    self.addProcessors();
  },
}));
