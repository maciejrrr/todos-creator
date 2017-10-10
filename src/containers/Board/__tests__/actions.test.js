import { addCard } from '../actions';
import { ADD_CARD } from '../constants';

describe('Board actions', () => {
  describe('addCard', () => {
    it('returns ADD_CARD type and text', () => {
      const card = { id: 1, name: 'test' };
      const expectedResult = {
        type: ADD_CARD,
        card,
      };
      expect(addCard({ card })).toEqual(expectedResult);
    });
  });
});
