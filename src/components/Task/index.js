import React from 'react';
import styled from 'styled-components';

import { colors, metrics } from '../../theme';

const TaskContainer = styled.div`
  background-color: ${colors.white};
  padding: ${metrics.smallMargin}px;
  box-shadow: ${colors.boxShadow};
  margin-bottom: ${metrics.baseMargin}px;
  color: ${colors.darkGrayText};
  :last-child {
    margin-bottom: 0;
  }
`;

const TaskName = styled.p`
  word-wrap: break-word;
`;

const Task = ({ task }) => {
  return (
    <TaskContainer>
      <TaskName>{task.name}</TaskName>
    </TaskContainer>
  );
};

export default Task;
