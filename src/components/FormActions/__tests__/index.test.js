import FormActions from '../index';

describe('FormActions component', () => {
  let props;
  beforeEach(() => {
    props = {
      focused: false,
      disabled: false,
      text: 'test',
      resetForm: jest.fn(),
    };
  });

  describe('snapshots', () => {
    it('returns null', () => {
      const tree = renderer.create(<FormActions {...props} />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders form actions', () => {
      const tree = renderer
        .create(<FormActions {...props} focused={true} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders form actions with disable submit button', () => {
      const tree = renderer
        .create(<FormActions {...props} focused={true} disabled={true} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
