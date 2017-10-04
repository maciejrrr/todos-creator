import React, { Component } from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';

import Routes from './Routes';
import { metrics, colors } from './theme';

const StyledLayout = styled(Layout)`
  padding: ${metrics.doubleMargin}px;
  min-height: 100vh;
`;

const Container = styled.div`
  padding: ${metrics.baseMargin}px;
  background-color: ${colors.white};
`;

class App extends Component {
  render() {
    return (
      <StyledLayout>
        <Container>
          <Routes />
        </Container>
      </StyledLayout>
    );
  }
}

export default App;
