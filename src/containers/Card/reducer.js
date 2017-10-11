import { ADD_CARD, EDIT_CARD } from './constants';
import { ADD_TASK } from '../Card/constants';

const initialState = {
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

const setEditCardState = (state, action) => ({
  ...state,
  cards: state.cards.map(card => {
    if (card.id === action.cardId) {
      return { ...card, name: action.name };
    }
    return card;
  }),
});

const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CARD:
      return setAddCardState(state, action);
    case EDIT_CARD:
      return setEditCardState(state, action);
    case ADD_TASK:
      return setAddTaskState(state, action);
    default:
      return state;
  }
};

export default cardsReducer;
