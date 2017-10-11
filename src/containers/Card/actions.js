import { ADD_CARD, EDIT_CARD, ADD_TASK } from './constants';

export const addCard = ({ card }) => ({
  type: ADD_CARD,
  card,
});

export const editCard = ({ cardId, name }) => ({
  type: EDIT_CARD,
  cardId,
  name,
});

export const addTask = ({ task }) => ({
  type: ADD_TASK,
  task,
});
