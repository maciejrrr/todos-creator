import { Board, mapDispatchToProps } from '../index';
import { addCard } from '../actions';

jest.mock('../../Card', () => 'Card');

describe('Board component', () => {
  let props;
  beforeEach(() => {
    props = {
      cards: [],
      addCard: jest.fn(),
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
        const cards = [
          { id: 1, name: 'first card' },
          { id: 2, name: 'second card' },
        ];
        const tree = renderer
          .create(<Board {...props} cards={cards} />)
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
    describe('addCard', () => {
      it('dispatches addCard with card object', () => {
        const card = { id: 1, name: 'test' };
        result.addCard({ card });
        expect(dispatch).toBeCalledWith(addCard({ card }));
      });
    });
  });
});
