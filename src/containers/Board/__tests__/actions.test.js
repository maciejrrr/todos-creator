import * as actions from '../actions';
import * as constants from '../constants';

describe('Board actions', () => {
  describe('addCard', () => {
    it('returns ADD_CARD type and text', () => {
      const card = { id: 1 };
      const expectedResult = {
        type: constants.ADD_CARD,
        card,
      };
      expect(actions.addCard({ card })).toEqual(expectedResult);
    });
  });

  describe('addTask', () => {
    it('returns ADD_TASK type and text', () => {
      const task = { id: 1 };
      const expectedResult = {
        type: constants.ADD_TASK,
        task,
      };
      expect(actions.addTask({ task })).toEqual(expectedResult);
    });
  });
});
