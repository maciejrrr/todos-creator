import React from 'react';
import { Icon } from 'antd';
import styled, { css } from 'styled-components';

import { metrics, colors } from '../../theme';

const ActionsContainer = styled.div`
  margin-top: ${props => (props.inline ? 0 : metrics.smallMargin)}px;
  margin-left: ${metrics.smallMargin}px;
  display: flex;
  align-items: center;
`;

const SubmitButton = styled.button`
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
      color: ${colors.grayText};
    `};
`;

const CancelForm = styled(Icon)`
  cursor: pointer;
  font-size: ${metrics.fontSize.xl}px;
  margin-left: ${metrics.smallMargin}px;
  color: ${colors.grayText};
`;

const FormActions = ({ focused, disabled, text, resetForm, inline }) => {
  let content = null;
  if (focused) {
    content = (
      <ActionsContainer inline={inline}>
        <SubmitButton htmlType="submit" disabled={disabled}>
          {text}
        </SubmitButton>
        <CancelForm type="close" onClick={resetForm} />
      </ActionsContainer>
    );
  }
  return content;
};

export default FormActions;
