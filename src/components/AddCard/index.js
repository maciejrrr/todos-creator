import React, { Component } from 'react';
import uniqueId from 'lodash/uniqueId';
import styled, { css } from 'styled-components';

import FormActions from '../FormActions';
import { metrics, colors } from '../../theme';

const Form = styled.form`
  padding: ${metrics.smallMargin}px;
  width: 180px;
  border-radius: ${metrics.borderRadius}px;
  background-color: ${props =>
    props.focused ? colors.cardBackground : 'transparent'};
`;

const Input = styled.input`
  background-color: ${colors.addCardBackground};
  width: 100%;
  border: 0;
  outline-width: 0;
  height: ${metrics.inputHeight}px;
  padding: ${metrics.smallMargin}px;
  color: ${colors.addCardText};
  ::placeholder {
    color: ${colors.addCardText};
  }
  ${props =>
    props.focused &&
    css`
      color: ${colors.grayText};
      ::placeholder {
        color: ${colors.grayText};
      }
    `};
`;

class AddCard extends Component {
  state = {
    name: '',
    focused: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addCard({
      card: {
        id: uniqueId(),
        name: this.state.name,
      },
    });
    this.handleResetForm();
    this.input.blur();
  };

  handleChange = e => {
    this.setState({ name: e.target.value });
  };

  handleFocus = () => {
    this.setState({ focused: true });
  };

  handleResetForm = () => {
    this.setState({ focused: false, name: '' });
  };

  render() {
    const { focused, name } = this.state;
    return (
      <Form focused={focused} onSubmit={this.handleSubmit}>
        <Input
          innerRef={input => (this.input = input)}
          focused={focused}
          placeholder="Add a card..."
          onChange={this.handleChange}
          value={name}
          onFocus={this.handleFocus}
        />
        <FormActions
          focused={focused}
          disabled={!name}
          text="Add"
          resetForm={this.handleResetForm}
        />
      </Form>
    );
  }
}

export default AddCard;
