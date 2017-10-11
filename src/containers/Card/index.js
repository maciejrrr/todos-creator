import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import { Droppable } from 'react-beautiful-dnd';

import AddTask from '../../components/AddTask';
import Task from '../../components/Task';
import EditableField from '../../components/EditableField';
import { ItemTypes } from './constants';
import { cardTasksSelector } from './selectors';
import { addTask, editCard } from './actions';
import { metrics, colors } from '../../theme';

const StyledCard = styled.div`
  border-radius: ${metrics.borderRadius}px;
  width: 180px;
  background-color: ${colors.cardBackground};
`;

const CardBody = styled.div`
  padding: ${metrics.smallMargin}px;
`;

export class Card extends Component {
  renderTasks() {
    return this.props.tasks.map(task => <Task key={task.id} task={task} />);
  }

  render() {
    const { addTask, card: { name, id }, editCard } = this.props;
    return (
      <Droppable droppableId={id} type={ItemTypes.TASK}>
        {provided => (
          <StyledCard innerRef={provided.innerRef}>
            <CardBody>
              <EditableField name={name} fieldId={id} edit={editCard} />
              {this.renderTasks()}
            </CardBody>
            {provided.placeholder}
            <AddTask addTask={addTask} cardId={id} />
          </StyledCard>
        )}
      </Droppable>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  tasks: cardTasksSelector,
});

export const mapDispatchToProps = dispatch => ({
  addTask: ({ task, cardId }) => dispatch(addTask({ task, cardId })),
  editCard: ({ id, text }) => dispatch(editCard({ cardId: id, name: text })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
