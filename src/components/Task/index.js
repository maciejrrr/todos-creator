import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

import { ItemTypes } from '../../containers/Card/constants';
import { colors, metrics } from '../../theme';

const TaskContainer = styled.div`
  background-color: ${colors.white};
  padding: ${metrics.smallMargin}px;
  box-shadow: ${colors.boxShadow};
  margin-top: ${metrics.baseMargin}px;
  color: ${colors.darkGrayText};
  :last-child {
    margin-bottom: 0;
  }
`;

const TaskName = styled.p`
  word-wrap: break-word;
`;

const Task = ({ task }) => {
  const { id, name } = task;
  return (
    <Draggable draggableId={id} type={ItemTypes.TASK}>
      {(provided, snapshot) => (
        <div>
          <TaskContainer
            innerRef={provided.innerRef}
            style={provided.draggableStyle}
            {...provided.dragHandleProps}
          >
            <TaskName>{name}</TaskName>
          </TaskContainer>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
