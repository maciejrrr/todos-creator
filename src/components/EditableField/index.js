import React, { Component } from 'react';
import styled from 'styled-components';

import { colors, metrics } from '../../theme';

const Name = styled.a`
  color: ${colors.darkGrayText};
  font-size: ${metrics.fontSize.lg}px;
  word-wrap: break-word;
  margin-bottom: ${metrics.smallMargin}px;
  :hover {
    color: ${colors.darkGrayText};
  }
`;

const Input = styled.input`
  color: ${colors.darkGrayText};
  height: ${metrics.inputHeight}px;
  padding: ${metrics.smallMargin}px;
  margin-bottom: ${metrics.smallMargin}px;
  width: 100%;
  border: 0;
  outline: 0;
`;

class EditableField extends Component {
  state = {
    editable: false,
    text: '',
  };

  handleFieldClick = () => {
    this.setState({ editable: true });
  };

  handleKeyPress = e => {
    const { edit, fieldId } = this.props;
    const { text } = this.state;
    if (e.key === 'Enter' && text) {
      e.preventDefault();
      edit({ text, id: fieldId });
      this.resetForm();
    }
  };

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  resetForm = () => {
    this.setState({ editable: false, text: '' });
  };

  render() {
    const { name } = this.props;
    const { editable, text } = this.state;
    let content = <Name onClick={this.handleFieldClick}>{name}</Name>;
    if (editable) {
      content = (
        <Input
          autoFocus
          value={text}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          onBlur={this.resetForm}
        />
      );
    }
    return content;
  }
}

export default EditableField;
