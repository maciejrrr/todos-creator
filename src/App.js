import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';
import styled from 'styled-components';

import Routes from './Routes';
import { metrics, colors } from './theme';

const StyledLayout = styled(Layout)`
  padding: ${metrics.doubleMargin}px;
  height: 100vh;
`;

const Container = styled.div`
  padding: ${metrics.baseMargin}px;
  background-color: ${colors.white};
`;

class App extends Component {
  render() {
    return (
      <StyledLayout>
        <Row>
          <Col span={12} offset={6}>
            <Container>
              <Routes />
            </Container>
          </Col>
        </Row>
      </StyledLayout>
    );
  }
}

export default App;
