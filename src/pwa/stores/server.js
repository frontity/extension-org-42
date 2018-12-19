import Base from './base';

export default Base.actions(self => ({
  beforeSsr() {
    self.addProcessors();
  },
}));
