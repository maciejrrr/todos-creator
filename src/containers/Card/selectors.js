import { createSelector } from 'reselect';
import { boardStateSelector } from '../Board/selectors';

export const cardIdSelector = (state, props) => props.card.id;

export const allTasksSelector = createSelector(
  boardStateSelector,
  boardState => boardState.tasks
);

export const cardTasksSelector = createSelector(
  allTasksSelector,
  cardIdSelector,
  (allTasks, cardId) => {
    return allTasks.filter(task => task.cardId === cardId);
  }
);
