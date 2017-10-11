import { Board, mapDispatchToProps, reorderArray, reorderDragAndDrop } from '../index';
import { addCard, updateCardsTasks } from '../../Card/actions';
import { ItemTypes } from '../../Card/constants';

jest.mock('../../Card', () => 'Card');

describe('reorderArray', () => {
  it('changes array order', () => {
    const arr = [1, 2, 3];
    const startIndex = 0;
    const endIndex = 2;
    expect(reorderArray({ arr, startIndex, endIndex })).toEqual([2, 3, 1]);
  });
});

describe('reorderDragAndDrop', () => {
  let tasksMap;
  let source;
  let destination;
  beforeEach(() => {
    tasksMap = { 1: [1, 2, 3] };
    source = { index: 0, droppableId: 1 };
  });
  it('returns reordered array when moving to same card', () => {
    destination = { index: 2, droppableId: 1 };
    expect(reorderDragAndDrop({ tasksMap, source, destination })).toEqual({
      1: [2, 3, 1],
    });
  });

  it('returns two reordered arrays when moving to different card', () => {
    destination = { index: 0, droppableId: 2 };
    expect(reorderDragAndDrop({ tasksMap, source, destination })).toEqual({
      1: [2, 3],
      2: [1],
    });
  });
});

describe('Board component', () => {
  let props;
  beforeEach(() => {
    props = {
      cards: [],
      addCard: jest.fn(),
      updateCardsTasks: jest.fn(),
      cardTaskIds: {},
    };
  });

  describe('snapshots', () => {
    describe('no cards', () => {
      it('renders AddCard component without any cards', () => {
        const tree = renderer.create(<Board {...props} />).toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('with cards', () => {
      it('renders AddCard component and cards', () => {
        const cards = [{ id: 1, name: 'first card' }, { id: 2, name: 'second card' }];
        const tree = renderer.create(<Board {...props} cards={cards} />).toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });

  describe('handleDragEnd', () => {
    let component;
    describe('does not call updateCardsTasks', () => {
      beforeEach(() => {
        component = shallow(<Board {...props} />);
      });

      it('has no destination', () => {
        component.instance().handleDragEnd({});
        expect(props.updateCardsTasks).not.toHaveBeenCalled();
      });

      it('has wrong type', () => {
        const destination = { index: 2, droppableId: 1 };
        component.instance().handleDragEnd({ destination });
        expect(props.updateCardsTasks).not.toHaveBeenCalled();
      });
    });

    it('calls updateCardsTasks when result type is TASK', () => {
      const tasksMap = { 1: [1, 2, 3] };
      const source = { index: 0, droppableId: 1 };
      const destination = { index: 0, droppableId: 1 };
      const result = {
        destination,
        source,
        type: ItemTypes.TASK,
      };
      component = shallow(<Board {...props} cardTaskIds={tasksMap} />);
      component.instance().handleDragEnd(result);
      expect(props.updateCardsTasks);
    });
  });

  describe('mapDispatchToprops', () => {
    let dispatch;
    let result;

    beforeEach(() => {
      dispatch = jest.fn();
      result = mapDispatchToProps(dispatch);
    });
    describe('addCard', () => {
      it('dispatches addCard with card object', () => {
        const card = { id: 1, name: 'test' };
        result.addCard({ card });
        expect(dispatch).toBeCalledWith(addCard({ card }));
      });
    });

    describe('updateCardsTasks', () => {
      it('dispatches updateCardsTasks with cardsTasks object', () => {
        const cardsTasks = { 1: [1, 2] };
        result.updateCardsTasks({ cardsTasks });
        expect(dispatch).toBeCalledWith(updateCardsTasks({ cardsTasks }));
      });
    });
  });
});
