import { createSelector } from 'reselect';

export const cardIdSelector = (state, props) => props.card.id;

export const cardsStateSelector = state => state.cardsState;

export const cardsSelector = createSelector(cardsStateSelector, cardsState => cardsState.cards);

export const allTasksSelector = createSelector(cardsStateSelector, cardsState => cardsState.tasks);

export const allCardTaskIdsSelector = createSelector(
  cardsStateSelector,
  cardsState => cardsState.cardTaskIds
);

export const cardTaskIdsSelector = createSelector(
  allCardTaskIdsSelector,
  cardIdSelector,
  (allCardTaskIds, cardId) => allCardTaskIds[cardId] || []
);

export const cardTasksSelector = createSelector(
  allTasksSelector,
  cardTaskIdsSelector,
  (allTasks, cardTaskIds) => {
    return cardTaskIds.map(taskId => allTasks.find(task => task.id === taskId));
  }
);
