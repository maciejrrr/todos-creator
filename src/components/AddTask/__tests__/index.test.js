import AddTask from '../index';

describe('AddTask component', () => {
  let props;
  beforeEach(() => {
    props = {
      addTask: jest.fn(),
      cardId: 1,
    };
  });

  describe('snapshots', () => {
    describe('initial state', () => {
      it('renders card footer with add task link', () => {
        const tree = renderer.create(<AddTask {...props} />).toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('showForm state', () => {
      it('renders task form', () => {
        const component = renderer.create(<AddTask {...props} />);
        component.getInstance().handleShowForm();
        expect(component.toJSON()).toMatchSnapshot();
      });
    });
  });

  describe('handleSubmit', () => {
    let e;
    let preventDefaultMock;
    let focusMock;
    let name;
    let component;
    beforeEach(() => {
      preventDefaultMock = jest.fn();
      focusMock = jest.fn();
      e = { preventDefault: preventDefaultMock };
      name = 'valid name';
      component = shallow(<AddTask {...props} />);
      component.setState({ name, showForm: true });
      component.instance().textarea = { focus: focusMock };
      component.instance().handleSubmit(e);
    });

    it('calls preventDefault', () => {
      expect(preventDefaultMock).toHaveBeenCalledTimes(1);
    });

    it('calls addTask', () => {
      expect(props.addTask).toBeCalledWith({
        task: {
          id: 1,
          name,
        },
        cardId: 1,
      });
    });

    it('resets name state', () => {
      expect(component.state().name).toBe('');
    });

    it('calls focus on textarea ref', () => {
      expect(focusMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleShowForm', () => {
    it('changes showForm state', () => {
      const component = shallow(<AddTask {...props} />);
      component.instance().handleShowForm();
      expect(component.state().showForm).toBe(true);
    });
  });

  describe('handleResetForm', () => {
    let component;
    beforeEach(() => {
      component = shallow(<AddTask {...props} />);
      component.setState({ showForm: true, name: 'test name' });
      component.instance().handleResetForm();
    });

    it('changes showForm state', () => {
      expect(component.state().showForm).toBe(false);
    });

    it('changes name state', () => {
      expect(component.state().name).toBe('');
    });
  });

  describe('handleChange', () => {
    it('changes name state', () => {
      const component = shallow(<AddTask {...props} />);
      const value = 'test value';
      const e = { target: { value } };
      component.instance().handleChange(e);
    });
  });
});
