import * as constants from './constants';

export const addCard = ({ card }) => ({
  type: constants.ADD_CARD,
  card,
});

export const addTask = ({ task }) => ({
  type: constants.ADD_TASK,
  task,
});
