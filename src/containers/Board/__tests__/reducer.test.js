import { ADD_CARD } from '../constants';
import { ADD_TASK } from '../../Card/constants';

import boardsReducer from '../reducer';

describe('Board reducer', () => {
  it('handles ADD_CARD', () => {
    const card = { id: 1, name: 'test' };
    expect(boardsReducer({ cards: [] }, { type: ADD_CARD, card })).toEqual({
      cards: [card],
    });
  });

  it('handles ADD_TASK', () => {
    const task = { id: 1, name: 'test', cardId: 1 };
    expect(boardsReducer({ tasks: [] }, { type: ADD_TASK, task })).toEqual({
      tasks: [task],
    });
  });
});
