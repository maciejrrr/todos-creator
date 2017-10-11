import { addCard, editCard, addTask } from '../actions';
import { ADD_CARD, EDIT_CARD, ADD_TASK } from '../constants';

describe('Card actions', () => {
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

  describe('editCard', () => {
    it('returns EDIT_CARD type and text', () => {
      const cardId = 1;
      const name = 'updated name';
      const expectedResult = {
        type: EDIT_CARD,
        cardId,
        name,
      };
      expect(editCard({ cardId, name })).toEqual(expectedResult);
    });
  });

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
