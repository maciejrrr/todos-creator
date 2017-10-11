import AddCard from '../index';

describe('AddCard component', () => {
  let props;
  beforeEach(() => {
    props = {
      addCard: jest.fn(),
    };
  });

  describe('snapshots', () => {
    describe('initial state', () => {
      it('renders without focused components', () => {
        const tree = renderer.create(<AddCard {...props} />).toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('focused state', () => {
      it('renders focused form', () => {
        const component = renderer.create(<AddCard {...props} />);
        component.getInstance().handleFocus();
        expect(component.toJSON()).toMatchSnapshot();
      });
    });
  });

  describe('handleSubmit', () => {
    let e;
    let preventDefaultMock;
    let handleResetFormMock;
    let blurMock;
    let name;
    beforeEach(() => {
      preventDefaultMock = jest.fn();
      handleResetFormMock = jest.fn();
      blurMock = jest.fn();
      const component = shallow(<AddCard {...props} />);
      e = { preventDefault: preventDefaultMock };
      name = 'valid name';
      component.instance().handleResetForm = handleResetFormMock;
      component.instance().input = { blur: blurMock };
      component.setState({ name, focused: true });
      component.instance().handleSubmit(e);
    });

    it('calls preventDefault', () => {
      expect(preventDefaultMock).toHaveBeenCalledTimes(1);
    });

    it('calls addCard', () => {
      expect(props.addCard).toBeCalledWith({
        card: {
          id: 1,
          name,
        },
      });
    });

    it('calls handleResetForm', () => {
      expect(handleResetFormMock).toHaveBeenCalledTimes(1);
    });

    it('calls blur on input ref', () => {
      expect(blurMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleChange', () => {
    it('changes name state', () => {
      const component = shallow(<AddCard {...props} />);
      const value = 'test value';
      const e = { target: { value } };
      component.instance().handleChange(e);
    });
  });

  describe('handleFocus', () => {
    it('changes focused state', () => {
      const component = shallow(<AddCard {...props} />);
      component.instance().handleFocus();
      expect(component.state().focused).toBe(true);
    });
  });

  describe('handleResetForm', () => {
    let component;
    beforeEach(() => {
      component = shallow(<AddCard {...props} />);
      component.setState({ focused: true, name: 'test name' });
      component.instance().handleResetForm();
    });

    it('changes focused state', () => {
      expect(component.state().focused).toBe(false);
    });

    it('changes name state', () => {
      expect(component.state().name).toBe('');
    });
  });
});
