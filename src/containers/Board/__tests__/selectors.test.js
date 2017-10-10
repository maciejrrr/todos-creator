import { boardStateSelector, cardsSelector } from '../selectors';

describe('Board selectors', () => {
  let mockedState;
  let card1;
  beforeEach(() => {
    card1 = { id: 1, name: 'test' };
    mockedState = {
      boards: {
        cards: [card1],
      },
    };
  });

  describe('boardStateSelector', () => {
    it('returns boards reducer state', () => {
      expect(boardStateSelector(mockedState)).toEqual(mockedState.boards);
    });
  });

  describe('cardsSelector', () => {
    it('returns cards array', () => {
      expect(cardsSelector(mockedState)).toEqual([card1]);
    });
  });
});
