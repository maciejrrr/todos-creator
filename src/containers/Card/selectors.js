import { createSelector } from 'reselect';
import pickBy from 'lodash/pickBy';

export const cardsStateSelector = state => state.cardsState;

export const cardIdSelector = (state, props) => props.card.id;

export const boardIdSelector = (state, props) => props.boardId;

export const allCardsSelector = createSelector(cardsStateSelector, cardsState => cardsState.cards);

export const cardsSelector = createSelector(
  allCardsSelector,
  boardIdSelector,
  (allCards, boardId) => allCards.filter(card => card.boardId === boardId)
);

export const allTasksSelector = createSelector(cardsStateSelector, cardsState => cardsState.tasks);

export const allCardTaskIdsSelector = createSelector(
  cardsStateSelector,
  cardsState => cardsState.cardTaskIds
);

export const tasksForCardsInBoardSelector = createSelector(
  allCardTaskIdsSelector,
  cardsSelector,
  (allCardTaskIds, cards) => {
    const cardsIds = cards.map(card => `${card.id}`);
    return pickBy(allCardTaskIds, (value, key) => cardsIds.includes(`${key}`));
  }
);

export const cardTaskIdsSelector = createSelector(
  allCardTaskIdsSelector,
  cardIdSelector,
  (boardCardTaskIds, cardId) => boardCardTaskIds[cardId] || []
);

export const cardTasksSelector = createSelector(
  allTasksSelector,
  cardTaskIdsSelector,
  (allTasks, cardTaskIds) => cardTaskIds.map(taskId => allTasks.find(task => task.id === taskId))
);
