import React, { Component } from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Board from '../Board';
import BoardSelect from '../../components/BoardSelect';
import { addBoard } from '../Board/actions';
import { allBoardsSelector } from '../Board/selectors';
import { metrics, colors } from '../../theme';

const StyledLayout = styled(Layout)`
  min-height: 100vh;
  background-color: ${colors.boardBackgroud};
`;

const Header = styled(Layout.Header)`
  background-color: ${colors.cardBackground};
  padding: 0 ${metrics.doubleMargin}px;
  margin-bottom: ${metrics.baseMargin}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  line-height: ${metrics.fontSize.xl}px;
`;

export class App extends Component {
  state = {
    boardId: null,
  };

  handleBoardChange = value => {
    this.setState({ boardId: value });
  };

  handleAddBoard = ({ item }) => {
    this.props.addBoard({ board: item });
    this.handleBoardChange(item.id);
  };

  render() {
    const { boards } = this.props;
    const { boardId } = this.state;
    return (
      <StyledLayout>
        <Header>
          <BoardSelect
            value={boardId}
            boardChange={this.handleBoardChange}
            boards={boards}
            addBoard={this.handleAddBoard}
          />
        </Header>
        <Board boardId={boardId} />
      </StyledLayout>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  boards: allBoardsSelector,
});

export const mapDispatchToProps = dispatch => ({
  addBoard: ({ board }) => dispatch(addBoard({ board })),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
