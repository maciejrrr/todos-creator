import React, { Component } from 'react';
import uniqueId from 'lodash/uniqueId';
import styled, { css } from 'styled-components';
import { Icon } from 'antd';

import { metrics, colors } from '../../theme';

const Form = styled.form`
  padding: ${metrics.smallMargin}px;
  border-radius: ${metrics.borderRadius}px;
  background-color: ${props =>
    props.focused ? colors.cardBackground : 'transparent'};
`;

const Input = styled.input`
  background-color: ${colors.addCardBackground};
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
      color: ${colors.cardText};
      ::placeholder {
        color: ${colors.cardText};
      }
    `};
`;

const Actions = styled.div`
  margin-top: ${metrics.smallMargin}px;
  display: flex;
  align-items: center;
`;

const Submit = styled.button`
  border: 0;
  border-radius: ${metrics.borderRadius}px;
  background-image: linear-gradient(${colors.gradient});
  padding: ${metrics.smallMargin}px ${metrics.doubleMargin}px;
  color: ${colors.white};
  ${props =>
    props.disabled &&
    css`
      cursor: not-allowed;
      background-image: none;
      background-color: ${colors.white};
      color: ${colors.cardText};
    `};
`;

const Cancel = styled(Icon)`
  cursor: pointer;
  font-size: ${metrics.fontSize.xl}px;
  margin-left: ${metrics.smallMargin}px;
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
          focused={focused}
          placeholder="Add a card"
          onChange={this.handleChange}
          value={name}
          onFocus={this.handleFocus}
        />
        {focused && (
          <Actions>
            <Submit htmlType="submit" disabled={!name}>
              Add
            </Submit>
            <Cancel type="close" onClick={this.handleResetForm} />
          </Actions>
        )}
      </Form>
    );
  }
}

export default AddCard;
