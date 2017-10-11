import { ADD_BOARD } from './constants';

export const addBoard = ({ board }) => ({
  type: ADD_BOARD,
  board,
});
