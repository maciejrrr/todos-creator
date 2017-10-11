import { App, mapDispatchToProps } from '../index';
import { addBoard } from '../../Board/actions';

jest.mock('../../Board', () => 'Board');

describe('App component', () => {
  let props;
  beforeEach(() => {
    props = {
      boards: [],
      addBoard: jest.fn(),
    };
  });

  describe('snapshots', () => {
    describe('default state', () => {
      it('renders Board container without boardId', () => {
        const tree = renderer.create(<App {...props} />).toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('with boardId in state', () => {
      it('renders Board container with boardId', () => {
        const container = renderer.create(<App {...props} boards={[{ id: 1, name: 'test' }]} />);
        container.getInstance().handleBoardChange(1);
        expect(container.toJSON()).toMatchSnapshot();
      });
    });
  });

  describe('handleBoardChange', () => {
    it('sets boardId state', () => {
      const value = 2;
      const component = shallow(<App {...props} />);
      component.instance().handleBoardChange(value);
      expect(component.state().boardId).toBe(value);
    });
  });

  describe('handleAddBoard', () => {
    let item;
    let handleBoardChangeMock;
    let component;
    beforeEach(() => {
      item = { id: 2, name: 'test board' };
      handleBoardChangeMock = jest.fn();
      component = shallow(<App {...props} />);
      component.instance().handleBoardChange = handleBoardChangeMock;
      component.instance().handleAddBoard({ item });
    });

    it('calls addBoard', () => {
      expect(props.addBoard).toHaveBeenCalledWith({ board: item });
    });

    it('calls handleBoardChange', () => {
      expect(handleBoardChangeMock).toHaveBeenCalledWith(item.id);
    });
  });

  describe('mapDispatchToprops', () => {
    let dispatch;
    let result;
    beforeEach(() => {
      dispatch = jest.fn();
      result = mapDispatchToProps(dispatch);
    });

    describe('addBoard', () => {
      it('dispatches addBoard with card object', () => {
        const board = { id: 1, name: 'test board' };
        result.addBoard({ board });
        expect(dispatch).toBeCalledWith(addBoard({ board }));
      });
    });
  });
});
