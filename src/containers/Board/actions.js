import { ADD_CARD } from './constants';

export const addCard = ({ card }) => ({
  type: ADD_CARD,
  card,
});
