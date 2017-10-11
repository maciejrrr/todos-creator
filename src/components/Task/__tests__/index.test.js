import Task from '../index';

describe('Task component', () => {
  let props;
  beforeEach(() => {
    props = {
      task: {
        id: 1,
        cardId: 1,
        name: 'test task',
      },
    };
  });

  describe('snapshots', () => {
    it('task with passed name', () => {
      const tree = renderer.create(<Task {...props} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
