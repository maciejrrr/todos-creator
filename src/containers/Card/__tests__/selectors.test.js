import {
  cardIdSelector,
  boardIdSelector,
  cardsStateSelector,
  allCardsSelector,
  cardsSelector,
  allTasksSelector,
  allCardTaskIdsSelector,
  cardTaskIdsSelector,
  cardTasksSelector,
  tasksForCardsInBoardSelector,
} from '../selectors';

describe('Card selectors', () => {
  let mockedState;
  let card1;
  let card2;
  let task1;
  let task2;
  let task3;
  let cardId;
  let cardTaskIds;
  let boardId;
  beforeEach(() => {
    cardId = 1;
    boardId = 1;
    card1 = { id: cardId, name: 'card', boardId };
    card2 = { id: 2, name: 'card from second board', boardId: 2 };
    task1 = { id: 1, name: 'task' };
    task2 = { id: 2, name: 'second task' };
    task3 = { id: 5, name: 'other board' };
    cardTaskIds = { [cardId]: [card1.id], 2: [task2.id], 5: [task3.id] };
    mockedState = {
      cardsState: {
        cards: [card1, card2],
        tasks: [task1, task2, task3],
        cardTaskIds: cardTaskIds,
      },
    };
  });

  describe('cardsStateSelector', () => {
    it('returns cards reducer whole state', () => {
      expect(cardsStateSelector(mockedState)).toEqual(mockedState.cardsState);
    });
  });

  describe('with props', () => {
    let props;
    beforeEach(() => {
      props = {
        card: {
          id: cardId,
        },
        boardId,
      };
    });

    describe('cardIdSelector', () => {
      it('returns current card id', () => {
        expect(cardIdSelector(mockedState, props)).toEqual(cardId);
      });
    });

    describe('boardIdSelector', () => {
      it('returns current board id', () => {
        expect(boardIdSelector(mockedState, props)).toEqual(boardId);
      });
    });

    describe('allCardsSelector', () => {
      it('returns all cards array', () => {
        expect(allCardsSelector(mockedState)).toEqual([card1, card2]);
      });
    });

    describe('cardsSelector', () => {
      it('returns cards from board', () => {
        expect(cardsSelector(mockedState, props)).toEqual([card1]);
      });
    });

    describe('tasksForCardsInBoardSelector', () => {
      it('returns cardTaskIds for cards in board', () => {
        expect(tasksForCardsInBoardSelector(mockedState, props)).toEqual({
          [cardId]: [card1.id],
        });
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
      expect(allTasksSelector(mockedState)).toEqual([task1, task2, task3]);
    });
  });

  describe('allCardTaskIdsSelector', () => {
    it('returns all cardTaskIds', () => {
      expect(allCardTaskIdsSelector(mockedState)).toEqual(cardTaskIds);
    });
  });
});
