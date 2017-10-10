import { addTask } from '../actions';
import { ADD_TASK } from '../constants';

describe('Board actions', () => {
  describe('addTask', () => {
    it('returns ADD_TASK type and text', () => {
      const task = { id: 1, name: 'test', cardId: 1 };
      const expectedResult = {
        type: ADD_TASK,
        task,
      };
      expect(addTask({ task })).toEqual(expectedResult);
    });
  });
});
