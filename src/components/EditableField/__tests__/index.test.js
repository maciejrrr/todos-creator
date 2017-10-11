import EditableField from '../index';

describe('EditableField component', () => {
  let props;
  beforeEach(() => {
    props = {
      fieldId: 1,
      edit: jest.fn(),
      name: 'test field',
    };
  });

  describe('snapshots', () => {
    describe('initial state', () => {
      it('renders field name', () => {
        const tree = renderer.create(<EditableField {...props} />).toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('initial state', () => {
      it('renders field name', () => {
        const component = renderer.create(<EditableField {...props} />);
        component.getInstance().handleFieldClick();
        expect(component.toJSON()).toMatchSnapshot();
      });
    });
  });

  describe('handleFieldClick', () => {
    it('changes editable state', () => {
      const component = shallow(<EditableField {...props} />);
      component.instance().handleFieldClick();
      expect(component.state().editable).toBe(true);
    });
  });

  describe('handleKeyPress', () => {
    let e;
    let preventDefaultMock;
    let resetFormMock;
    beforeEach(() => {
      preventDefaultMock = jest.fn();
      resetFormMock = jest.fn();
    });

    describe('when submitting valid text', () => {
      let text;
      beforeEach(() => {
        const component = shallow(<EditableField {...props} />);
        e = { preventDefault: preventDefaultMock, key: 'Enter' };
        text = 'valid text';
        component.instance().resetForm = resetFormMock;
        component.setState({ text, editable: true });
        component.instance().handleKeyPress(e);
      });

      it('calls preventDefault', () => {
        expect(preventDefaultMock).toHaveBeenCalledTimes(1);
      });

      it('calls edit', () => {
        expect(props.edit).toBeCalledWith({
          text,
          id: props.fieldId,
        });
      });

      it('calls resetForm', () => {
        expect(resetFormMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('not valid', () => {
      let text;
      const sharedBehavior = () => {
        it('does not call preventDefault', () => {
          expect(preventDefaultMock).not.toHaveBeenCalled();
        });

        it('does not call edit', () => {
          expect(props.edit).not.toHaveBeenCalled();
        });

        it('doed not call resetForm', () => {
          expect(resetFormMock).not.toHaveBeenCalled();
        });
      };

      describe('key pressed is not Enter', () => {
        beforeEach(() => {
          const component = shallow(<EditableField {...props} />);
          e = { preventDefault: preventDefaultMock };
          text = 'valid text';
          component.instance().resetForm = resetFormMock;
          component.setState({ text, editable: true });
          component.instance().handleKeyPress(e);
        });
        sharedBehavior();
      });

      describe('no text', () => {
        beforeEach(() => {
          const component = shallow(<EditableField {...props} />);
          e = { preventDefault: preventDefaultMock, key: 'Enter' };
          component.instance().resetForm = resetFormMock;
          component.setState({ editable: true });
          component.instance().handleKeyPress(e);
        });
        sharedBehavior();
      });
    });
  });

  describe('handleChange', () => {
    it('changes text state', () => {
      const component = shallow(<EditableField {...props} />);
      const text = 'test text';
      const e = { target: { value: text } };
      component.instance().handleChange(e);
      expect(component.state().text).toBe(text);
    });
  });

  describe('resetForm', () => {
    let component;
    beforeEach(() => {
      const text = 'test text';
      const e = { target: { value: text } };
      component = shallow(<EditableField {...props} />);
      component.setState({ editable: true, text });
      component.instance().resetForm(e);
    });

    it('changes text state', () => {
      expect(component.state().text).toBe('');
    });

    it('changes editable state', () => {
      expect(component.state().editable).toBe(false);
    });
  });
});
