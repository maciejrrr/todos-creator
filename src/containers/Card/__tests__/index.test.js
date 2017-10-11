import { Card, mapDispatchToProps } from '../index';
import { addTask, editCard } from '../actions';
import { DragDropContext } from 'react-beautiful-dnd';

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
        const tree = renderer
          .create(
            <DragDropContext>
              <Card {...props} />
            </DragDropContext>
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('with tasks', () => {
      it('renders AddCard component and tasks', () => {
        const tasks = [{ id: 1, name: 'first task' }, { id: 2, name: 'second task' }];
        const tree = renderer
          .create(
            <DragDropContext>
              <Card {...props} tasks={tasks} />
            </DragDropContext>
          )
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
        const task = { id: 1, name: 'test' };
        result.addTask({ task });
        expect(dispatch).toBeCalledWith(addTask({ task }));
      });
    });

    describe('editCard', () => {
      it('dispatches editCard with task object', () => {
        const id = 1;
        const text = 'test text';
        result.editCard({ id, text });
        expect(dispatch).toBeCalledWith(editCard({ cardId: id, name: text }));
      });
    });
  });
});
