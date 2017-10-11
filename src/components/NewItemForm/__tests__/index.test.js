import NewItemForm from '../index';

describe('NewItemForm component', () => {
  let props;
  beforeEach(() => {
    props = {
      submit: jest.fn(),
    };
  });

  describe('snapshots', () => {
    describe('initial state', () => {
      it('renders without focused components', () => {
        const tree = renderer.create(<NewItemForm {...props} />).toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('focused state', () => {
      it('renders focused form', () => {
        const component = renderer.create(<NewItemForm {...props} />);
        component.getInstance().handleFocus();
        expect(component.toJSON()).toMatchSnapshot();
      });
    });

    describe('inline form', () => {
      it('renders inline form', () => {
        const component = renderer.create(<NewItemForm {...props} inline />);
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
      const component = shallow(<NewItemForm {...props} />);
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

    it('calls submit', () => {
      expect(props.submit).toBeCalledWith({
        item: {
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
      const component = shallow(<NewItemForm {...props} />);
      const value = 'test value';
      const e = { target: { value } };
      component.instance().handleChange(e);
    });
  });

  describe('handleFocus', () => {
    it('changes focused state', () => {
      const component = shallow(<NewItemForm {...props} />);
      component.instance().handleFocus();
      expect(component.state().focused).toBe(true);
    });
  });

  describe('handleResetForm', () => {
    let component;
    beforeEach(() => {
      component = shallow(<NewItemForm {...props} />);
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
