import { createSelector } from 'reselect';

export const boardStateSelector = state => state.boards;

export const cardsSelector = createSelector(
  boardStateSelector,
  boardState => boardState.cards
);
