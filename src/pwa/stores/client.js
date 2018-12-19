import Base from './base';

export default Base.actions(self => ({
  beforeCsr() {
    self.addProcessors();
  },
}));
