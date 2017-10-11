import { createSelector } from 'reselect';

export const boardsStateSelector = state => state.boardsState;

export const allBoardsSelector = createSelector(
  boardsStateSelector,
  boardsState => boardsState.boards
);
