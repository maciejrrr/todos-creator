import React, { Component } from 'react';
import { uniqueId } from 'lodash';
import styled from 'styled-components';

import FormActions from '../FormActions';
import { metrics, colors } from '../../theme';

const CardFooter = styled.div`
  padding: ${metrics.smallMargin}px;
  background-color: ${colors.cardFooter};
  border-bottom-left-radius: ${metrics.borderRadius}px;
  border-bottom-right-radius: ${metrics.borderRadius}px;
`;

const CardForm = styled.form`
  padding: ${metrics.smallMargin}px;
`;

const FormSwitch = styled.a`
  color: ${colors.grayText};
  :hover {
    text-decoration: underline;
    color: ${colors.grayText};
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  resize: none;
  border: 0;
  box-shadow: ${colors.boxShadow};
  padding: ${metrics.smallMargin}px;
  height: 5em;
  outline: 0;
  border-radius: ${metrics.borderRadius}px;
  vertical-align: top;
`;

class AddTask extends Component {
  state = {
    name: '',
    showForm: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    const { addTask, cardId } = this.props;
    addTask({
      task: {
        id: uniqueId(),
        name: this.state.name,
        cardId,
      },
    });
    this.setState({ name: '' });
    this.textarea.focus();
  };

  handleShowForm = () => {
    this.setState({ showForm: true });
  };

  handleResetForm = () => {
    this.setState({ showForm: false, name: '' });
  };

  handleChange = e => {
    this.setState({ name: e.target.value });
  };

  render() {
    const { showForm, name } = this.state;
    let content = (
      <CardFooter>
        <FormSwitch onClick={this.handleShowForm}>Add a task...</FormSwitch>
      </CardFooter>
    );
    if (showForm) {
      content = (
        <CardForm onSubmit={this.handleSubmit}>
          <Textarea
            innerRef={textarea => (this.textarea = textarea)}
            autoFocus
            onChange={this.handleChange}
            value={name}
          />
          <FormActions
            focused={showForm}
            disabled={!name}
            text="Add"
            resetForm={this.handleResetForm}
          />
        </CardForm>
      );
    }

    return content;
  }
}

export default AddTask;
