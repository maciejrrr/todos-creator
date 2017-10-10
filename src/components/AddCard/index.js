import React, { Component } from 'react';
import uniqueId from 'lodash/uniqueId';
import styled from 'styled-components';

import { metrics } from '../../theme';

const Form = styled.div`
  margin: ${metrics.baseMargin}px;
`;

class AddCard extends Component {
  state = {
    name: '',
  };

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.props.addCard({
        card: {
          id: uniqueId(),
          name: this.state.name,
        },
      });
      this.setState({ name: '' });
    }
  };

  render() {
    return (
      <Form>
        <input
          placeholder="Add card"
          onChange={e => this.setState({ name: e.target.value })}
          value={this.state.name}
          onKeyPress={this.handleKeyPress}
        />
      </Form>
    );
  }
}

export default AddCard;
