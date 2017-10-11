import { ADD_CARD, EDIT_CARD, ADD_TASK, UPDATE_CARDS_TASKS } from '../constants';

import cardsReducer from '../reducer';

describe('Card reducer', () => {
  it('by default returns initialState', () => {
    expect(cardsReducer(undefined, {})).toEqual({
      cards: [],
      tasks: [],
      cardTaskIds: {},
    });
  });

  it('handles ADD_CARD', () => {
    const card = { id: 1, name: 'test' };
    const cardId = 1;
    expect(cardsReducer({ cards: [] }, { type: ADD_CARD, card, cardId })).toEqual({
      cards: [card],
    });
  });

  it('handles EDIT_CARD', () => {
    const cardId = 1;
    const updatedName = 'new name';
    const card1 = { id: cardId, name: 'old name' };
    const card2 = { id: 2, name: 'second card' };
    expect(
      cardsReducer({ cards: [card1, card2] }, { type: EDIT_CARD, cardId, name: updatedName })
    ).toEqual({
      cards: [{ ...card1, name: updatedName }, card2],
    });
  });

  describe('handles ADD_TASK', () => {
    let task1;
    let task2;
    let firstCardId;
    beforeEach(() => {
      task1 = { id: 1, name: 'first task' };
      task2 = { id: 1, name: 'second task' };
      firstCardId = 1;
    });

    it('updates existing taskIds', () => {
      expect(
        cardsReducer(
          { tasks: [], cardTaskIds: {} },
          { type: ADD_TASK, task: task1, cardId: firstCardId }
        )
      ).toEqual({
        tasks: [task1],
        cardTaskIds: { [firstCardId]: [task1.id] },
      });
    });

    it('creates new taskIds', () => {
      expect(
        cardsReducer(
          { tasks: [task2], cardTaskIds: { [firstCardId]: [task2.id] } },
          { type: ADD_TASK, task: task1, cardId: firstCardId }
        )
      ).toEqual({
        tasks: [task2, task1],
        cardTaskIds: { [firstCardId]: [task2.id, task1.id] },
      });
    });
  });

  it('handles UPDATE_CARDS_TASKS', () => {
    const taskIds1 = { 1: [1, 2] };
    const cardsTasks = { 1: [2, 1], 2: [3] };
    expect(
      cardsReducer({ cardTaskIds: taskIds1 }, { type: UPDATE_CARDS_TASKS, cardsTasks })
    ).toEqual({
      cardTaskIds: cardsTasks,
    });
  });
});
