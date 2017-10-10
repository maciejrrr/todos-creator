import * as constants from './constants';

export const initialState = {
  cards: [],
  tasks: [],
};

const setAddCardState = (state, action) => ({
  ...state,
  cards: [...state.cards, action.card],
});

const setAddTaskState = (state, action) => ({
  ...state,
  tasks: [...state.tasks, action.task],
});

const boardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.ADD_CARD:
      return setAddCardState(state, action);
    case constants.ADD_TASK:
      return setAddTaskState(state, action);
    default:
      return state;
  }
};

export default boardsReducer;
