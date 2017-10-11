import { ADD_BOARD } from './constants';

const initialState = {
  boards: [],
};

const addBoardState = (state, action) => ({
  ...state,
  boards: [...state.boards, action.board],
});

const boardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOARD:
      return addBoardState(state, action);
    default:
      return state;
  }
};

export default boardsReducer;
