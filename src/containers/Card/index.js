import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';

import AddTask from '../../components/AddTask';
import Task from '../../components/Task';
import { cardTasksSelector } from './selectors';
import { addTask } from './actions';
import { metrics, colors } from '../../theme';

const StyledCard = styled.div`
  border-radius: ${metrics.borderRadius}px;
  width: 180px;
  background-color: ${colors.cardBackground};
`;

const CardBody = styled.div`
  padding: ${metrics.smallMargin}px;
`;

const CardName = styled.p`
  color: ${colors.darkGrayText};
  font-size: ${metrics.fontSize.lg}px;
  word-wrap: break-word;
  margin-bottom: ${metrics.smallMargin}px;
`;

export class Card extends Component {
  renderTasks() {
    return this.props.tasks.map(task => <Task key={task.id} task={task} />);
  }

  render() {
    const { addTask, card: { name, id } } = this.props;
    return (
      <StyledCard>
        <CardBody>
          <CardName>{name}</CardName>
          {this.renderTasks()}
        </CardBody>
        <AddTask addTask={addTask} cardId={id} />
      </StyledCard>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  tasks: cardTasksSelector,
});

export const mapDispatchToProps = dispatch => ({
  addTask: ({ task }) => dispatch(addTask({ task })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
