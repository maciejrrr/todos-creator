import { ADD_BOARD } from '../constants';
import boardsReducer from '../reducer';

describe('Board reducer', () => {
  it('by default returns initialState', () => {
    expect(boardsReducer(undefined, {})).toEqual({
      boards: [],
    });
  });

  it('handles ADD_BOARD', () => {
    const board = { id: 1, name: 'new board' };
    expect(boardsReducer({ boards: [] }, { type: ADD_BOARD, board })).toEqual({
      boards: [board],
    });
  });
});
