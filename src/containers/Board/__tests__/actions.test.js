import { ADD_BOARD } from '../constants';
import { addBoard } from '../actions';

describe('Board actions', () => {
  describe('addBoard', () => {
    it('returns ADD_BOARD type and board object', () => {
      const board = { id: 1, name: 'test board' };
      const expectedValue = {
        type: ADD_BOARD,
        board,
      };
      expect(addBoard({ board })).toEqual(expectedValue);
    });
  });
});
