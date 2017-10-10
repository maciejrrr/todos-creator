import { createSelector } from 'reselect';

export const boardStateSelector = state => state.boards;

export const cardsSelector = createSelector(
  boardStateSelector,
  boardState => boardState.cards
);

export const allTasksSelector = createSelector(
  boardStateSelector,
  boardState => boardState.tasks
);

export const cardIdSelector = (state, ownProps) => ownProps.card.id;

export const tasksSelector = createSelector(
  allTasksSelector,
  cardIdSelector,
  (allTasks, cardId) => {
    return allTasks.filter(task => task.cardId === cardId);
  }
);
