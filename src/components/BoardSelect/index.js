import React from 'react';
import { Select } from 'antd';
import styled from 'styled-components';

import { metrics } from '../../theme';
import NewItemForm from '../NewItemForm';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledSelect = styled(Select)`
  width: ${metrics.formWidth}px;
  margin-right: ${metrics.smallMargin}px;
`;

const BoardSelect = ({ boardChange, boards, addBoard, value }) => {
  const selectedOption = value || 'Select board';
  return (
    <Container>
      <StyledSelect
        dropdownStyle={{ width: `${metrics.formWidth}px` }}
        value={selectedOption}
        notFoundContent="No boards"
        onSelect={boardChange}
      >
        {boards.map(board => (
          <Select.Option key={board.id} value={board.id}>
            {board.name}
          </Select.Option>
        ))}
      </StyledSelect>
      <NewItemForm submit={addBoard} inline placeholder="Add a board" />
    </Container>
  );
};

export default BoardSelect;
