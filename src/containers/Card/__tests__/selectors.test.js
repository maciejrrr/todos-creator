import {
  cardsStateSelector,
  cardsSelector,
  cardIdSelector,
  allTasksSelector,
  cardTasksSelector,
} from '../selectors';

describe('Card selectors', () => {
  let mockedState;
  let card1;
  let task1;
  let task2;
  let cardId;
  beforeEach(() => {
    cardId = 1;
    card1 = { id: cardId, name: 'card' };
    task1 = { id: 1, cardId, name: 'task' };
    task2 = { id: 2, cardId: 2, name: 'second task' };
    mockedState = {
      cardsState: {
        cards: [card1],
        tasks: [task1, task2],
      },
    };
  });

  describe('cardsStateSelector', () => {
    it('returns cards reducer whole state', () => {
      expect(cardsStateSelector(mockedState)).toEqual(mockedState.cardsState);
    });
  });

  describe('cardsSelector', () => {
    it('returns cards array', () => {
      expect(cardsSelector(mockedState)).toEqual([card1]);
    });
  });

  describe('cardId required in props', () => {
    let props;
    beforeEach(() => {
      props = {
        card: {
          id: cardId,
        },
      };
    });

    describe('cardIdSelector', () => {
      it('returns current card id', () => {
        expect(cardIdSelector(mockedState, props)).toEqual(cardId);
      });
    });

    describe('cardTasksSelector', () => {
      it('returns tasks for specific card', () => {
        expect(cardTasksSelector(mockedState, props)).toEqual([task1]);
      });
    });
  });

  describe('allTasksSelector', () => {
    it('returns all tasks', () => {
      expect(allTasksSelector(mockedState)).toEqual([task1, task2]);
    });
  });
});
