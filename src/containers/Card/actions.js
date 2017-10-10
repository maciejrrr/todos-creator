import { ADD_TASK } from './constants';

export const addTask = ({ task }) => ({
  type: ADD_TASK,
  task,
});
