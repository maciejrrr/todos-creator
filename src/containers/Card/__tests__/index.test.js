import { Card, mapDispatchToProps } from '../index';
import { addTask } from '../actions';

describe('Card component', () => {
  let props;
  beforeEach(() => {
    props = {
      tasks: [],
      addTask: jest.fn(),
      card: { id: 1, name: 'first card' },
    };
  });

  describe('snapshots', () => {
    describe('no tasks', () => {
      it('renders AddTask component without any tasks', () => {
        const tree = renderer.create(<Card {...props} />).toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('with tasks', () => {
      it('renders AddCard component and tasks', () => {
        const tasks = [
          { id: 1, cardId: 1, name: 'first task' },
          { id: 2, cardId: 2, name: 'second task' },
        ];
        const tree = renderer
          .create(<Card {...props} tasks={tasks} />)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });

  describe('mapDispatchToprops', () => {
    let dispatch;
    let result;

    beforeEach(() => {
      dispatch = jest.fn();
      result = mapDispatchToProps(dispatch);
    });
    describe('addTask', () => {
      it('dispatches addTask with task object', () => {
        const task = { id: 1, cardId: 1, name: 'test' };
        result.addTask({ task });
        expect(dispatch).toBeCalledWith(addTask({ task }));
      });
    });
  });
});