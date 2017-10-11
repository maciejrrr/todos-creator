import { createSelector } from 'reselect';

export const cardIdSelector = (state, props) => props.card.id;

export const cardsStateSelector = state => state.cardsState;

export const cardsSelector = createSelector(
  cardsStateSelector,
  cardsState => cardsState.cards
);

export const allTasksSelector = createSelector(
  cardsStateSelector,
  cardsState => cardsState.tasks
);

export const cardTasksSelector = createSelector(
  allTasksSelector,
  cardIdSelector,
  (allTasks, cardId) => {
    return allTasks.filter(task => task.cardId === cardId);
  }
);
