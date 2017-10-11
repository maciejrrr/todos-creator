import Task from '../index';
import { DragDropContext } from 'react-beautiful-dnd';

describe('Task component', () => {
  let props;
  beforeEach(() => {
    props = {
      task: {
        id: 1,
        name: 'test task',
      },
    };
  });

  describe('snapshots', () => {
    it('task with passed name', () => {
      const tree = renderer
        .create(
          <DragDropContext>
            <Task {...props} />
          </DragDropContext>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
