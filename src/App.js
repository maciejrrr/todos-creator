import React, { Component } from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';

import Board from './containers/Board';
import { metrics, colors } from './theme';

const StyledLayout = styled(Layout)`
  padding: ${metrics.doubleMargin}px;
  min-height: 100vh;
  background-color: ${colors.boardBackgroud};
`;

class App extends Component {
  render() {
    return (
      <StyledLayout>
        <Board />
      </StyledLayout>
    );
  }
}

export default App;
