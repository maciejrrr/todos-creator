import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import uniqueId from 'lodash/uniqueId';
import { createStructuredSelector } from 'reselect';

import { tasksSelector } from '../Board/selectors';
import { metrics } from '../../theme';
import { addTask } from '../Board/actions';

const StyledCard = styled.div`
  margin: ${metrics.baseMargin}px;
`;

class Card extends Component {
  state = {
    name: '',
  };

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      const { addTask, card: { id } } = this.props;
      e.preventDefault();
      addTask({
        task: {
          id: uniqueId(),
          name: this.state.name,
          cardId: id,
        },
      });
      this.setState({ name: '' });
    }
  };

  renderTasks() {
    return this.props.tasks.map(task => <p key={task.id}>{task.name}</p>);
  }

  render() {
    return (
      <StyledCard>
        <p>{this.props.card.name}</p>
        {this.renderTasks()}
        <input
          placeholder="Add task"
          onChange={e => this.setState({ name: e.target.value })}
          value={this.state.name}
          onKeyPress={this.handleKeyPress}
        />
      </StyledCard>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  tasks: tasksSelector,
});

const mapDispatchToprops = dispatch => ({
  addTask: ({ task }) => dispatch(addTask({ task })),
});

export default connect(mapStateToProps, mapDispatchToprops)(Card);
