import { ADD_CARD, EDIT_CARD } from '../constants';
import { ADD_TASK } from '../../Card/constants';

import cardsReducer from '../reducer';

describe('Card reducer', () => {
  it('by default returns initialState', () => {
    expect(cardsReducer(undefined, {})).toEqual({
      cards: [],
      tasks: [],
    });
  });

  it('handles ADD_CARD', () => {
    const card = { id: 1, name: 'test' };
    expect(cardsReducer({ cards: [] }, { type: ADD_CARD, card })).toEqual({
      cards: [card],
    });
  });

  it('handles EDIT_CARD', () => {
    const cardId = 1;
    const updatedName = 'new name';
    const card1 = { id: cardId, name: 'old name' };
    const card2 = { id: 2, name: 'second card' };
    expect(
      cardsReducer(
        { cards: [card1, card2] },
        { type: EDIT_CARD, cardId, name: updatedName }
      )
    ).toEqual({
      cards: [{ ...card1, name: updatedName }, card2],
    });
  });

  it('handles ADD_TASK', () => {
    const task = { id: 1, name: 'test', cardId: 1 };
    expect(cardsReducer({ tasks: [] }, { type: ADD_TASK, task })).toEqual({
      tasks: [task],
    });
  });
});
