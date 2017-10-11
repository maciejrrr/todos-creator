import { addCard, editCard, addTask, updateCardsTasks } from '../actions';
import { ADD_CARD, EDIT_CARD, ADD_TASK, UPDATE_CARDS_TASKS } from '../constants';

describe('Card actions', () => {
  describe('addCard', () => {
    it('returns ADD_CARD type and card object', () => {
      const card = { id: 1, name: 'test', boardId: 1 };
      const expectedResult = {
        type: ADD_CARD,
        card,
      };
      expect(addCard({ card })).toEqual(expectedResult);
    });
  });

  describe('editCard', () => {
    it('returns EDIT_CARD type, cardId and name', () => {
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
    it('returns ADD_TASK type, task object and cardId', () => {
      const task = { id: 1, name: 'test' };
      const cardId = 1;
      const expectedResult = {
        type: ADD_TASK,
        task,
        cardId,
      };
      expect(addTask({ task, cardId })).toEqual(expectedResult);
    });
  });

  describe('updateCardsTasks', () => {
    it('returns UPDATE_CARDS_TASKS type, task object and cardId', () => {
      const cardsTasks = { 1: [1, 2] };
      const expectedResult = {
        type: UPDATE_CARDS_TASKS,
        cardsTasks,
      };
      expect(updateCardsTasks({ cardsTasks })).toEqual(expectedResult);
    });
  });
});
