import { boardsStateSelector, allBoardsSelector } from '../selectors';

describe('Board selectors', () => {
  let mockedState;
  let boards;
  beforeEach(() => {
    boards = [{ id: 1, name: 'test' }];
    mockedState = {
      boardsState: {
        boards,
      },
    };
  });

  describe('boardsStateSelector', () => {
    it('returns boards reducer state', () => {
      expect(boardsStateSelector(mockedState)).toEqual(mockedState.boardsState);
    });
  });

  describe('allBoardsSelector', () => {
    it('returns all boards', () => {
      expect(allBoardsSelector(mockedState)).toEqual(boards);
    });
  });
});
