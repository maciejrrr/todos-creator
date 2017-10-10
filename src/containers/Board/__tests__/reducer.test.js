import * as constants from '../constants';

import boardsReducer from '../reducer';

describe('Board reducer', () => {
  it('handles ADD_CARD', () => {
    const card = { id: 1, name: 'test' };
    expect(
      boardsReducer({ cards: [] }, { type: constants.ADD_CARD, card })
    ).toEqual({
      cards: [card],
    });
  });

  it('handles ADD_TASK', () => {
    const task = { id: 1, name: 'test' };
    expect(
      boardsReducer({ tasks: [] }, { type: constants.ADD_TASK, task })
    ).toEqual({
      tasks: [task],
    });
  });
});
