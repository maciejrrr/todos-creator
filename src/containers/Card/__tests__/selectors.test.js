import {
  cardIdSelector,
  cardsStateSelector,
  cardsSelector,
  allTasksSelector,
  allCardTaskIdsSelector,
  cardTaskIdsSelector,
  cardTasksSelector,
} from '../selectors';

describe('Card selectors', () => {
  let mockedState;
  let card1;
  let task1;
  let task2;
  let cardId;
  let cardTaskIds;
  beforeEach(() => {
    cardId = 1;
    card1 = { id: cardId, name: 'card' };
    task1 = { id: 1, name: 'task' };
    task2 = { id: 2, name: 'second task' };
    cardTaskIds = { [cardId]: [card1.id], 2: [task2.id] };
    mockedState = {
      cardsState: {
        cards: [card1],
        tasks: [task1, task2],
        cardTaskIds: cardTaskIds,
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

    describe('cardTaskIdsSelector', () => {
      it('returns cardTaskIds for specific cardId', () => {
        expect(cardTaskIdsSelector(mockedState, props)).toEqual([card1.id]);
      });

      it('returns empty array if there is no match', () => {
        props = {
          card: {
            id: 3,
          },
        };
        expect(cardTaskIdsSelector(mockedState, props)).toEqual([]);
      });
    });
  });

  describe('allTasksSelector', () => {
    it('returns all tasks', () => {
      expect(allTasksSelector(mockedState)).toEqual([task1, task2]);
    });
  });

  describe('allCardTaskIdsSelector', () => {
    it('returns all cardTaskIds', () => {
      expect(allCardTaskIdsSelector(mockedState)).toEqual(cardTaskIds);
    });
  });
});
