import { ADD_CARD, EDIT_CARD, ADD_TASK, UPDATE_CARDS_TASKS } from './constants';

export const addCard = ({ card }) => ({
  type: ADD_CARD,
  card,
});

export const editCard = ({ cardId, name }) => ({
  type: EDIT_CARD,
  cardId,
  name,
});

export const addTask = ({ task, cardId }) => ({
  type: ADD_TASK,
  task,
  cardId,
});

export const updateCardsTasks = ({ cardsTasks }) => ({
  type: UPDATE_CARDS_TASKS,
  cardsTasks,
});
