import BoardSelect from '../index';

describe('BoardSelect component', () => {
  let props;
  beforeEach(() => {
    props = {
      boardChange: jest.fn(),
      boards: [],
      addBoard: jest.fn(),
      value: null,
    };
  });

  describe('snapshots', () => {
    describe('no boards', () => {
      it('renders select with default message and form', () => {
        const tree = renderer.create(<BoardSelect {...props} />).toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('selected board', () => {
      it('renders select with options and form', () => {
        const boards = [{ id: 1, name: 'first board' }, { id: 2, name: 'second board' }];
        const tree = renderer.create(<BoardSelect {...props} boards={boards} value={1} />).toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
});
