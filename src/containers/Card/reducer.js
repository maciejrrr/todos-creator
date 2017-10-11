import { ADD_TASK, ADD_CARD, EDIT_CARD, UPDATE_CARDS_TASKS } from './constants';

const initialState = {
  cards: [],
  tasks: [],
  cardTaskIds: {},
};

const setAddCardState = (state, action) => ({
  ...state,
  cards: [...state.cards, action.card],
});

const setAddTaskState = (state, action) => {
  const { task, cardId } = action;
  const cardTaskIds = state.cardTaskIds;
  return {
    ...state,
    tasks: [...state.tasks, task],
    cardTaskIds: {
      ...cardTaskIds,
      [cardId]: cardTaskIds[cardId] ? [...cardTaskIds[cardId], task.id] : [task.id],
    },
  };
};

const setEditCardState = (state, action) => ({
  ...state,
  cards: state.cards.map(card => {
    if (card.id === action.cardId) {
      return { ...card, name: action.name };
    }
    return card;
  }),
});

const setUpdateCardTasksState = (state, action) => ({
  ...state,
  cardTaskIds: { ...state.cardTaskIds, ...action.cardsTasks },
});

const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CARD:
      return setAddCardState(state, action);
    case EDIT_CARD:
      return setEditCardState(state, action);
    case ADD_TASK:
      return setAddTaskState(state, action);
    case UPDATE_CARDS_TASKS:
      return setUpdateCardTasksState(state, action);
    default:
      return state;
  }
};

export default cardsReducer;
