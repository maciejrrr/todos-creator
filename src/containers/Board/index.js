import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import { ItemTypes } from '../Card/constants';

import NewItemForm from '../../components/NewItemForm';
import Card from '../Card';
import { cardsSelector, tasksForCardsInBoardSelector } from '../Card/selectors';
import { addCard, updateCardsTasks } from '../Card/actions';
import { metrics, colors } from '../../theme';

const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const CardWrapper = styled.div`
  margin: ${metrics.baseMargin}px;
`;

const NoBoardInfo = styled.div`
  display: flex;
  margin: ${metrics.doubleMargin}px;
  align-items: center;
  justify-content: center;
`;

const H1 = styled.h1`
  color: ${colors.white};
`;

export const reorderArray = ({ arr, startIndex, endIndex }) => {
  const result = Array.from(arr);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const reorderDragAndDrop = ({ tasksMap, source, destination }) => {
  const current = [...tasksMap[source.droppableId]];
  const next = tasksMap[destination.droppableId] ? [...tasksMap[destination.droppableId]] : [];
  const target = current[source.index];

  if (source.droppableId === destination.droppableId) {
    const reordered = reorderArray({
      arr: current,
      startIndex: source.index,
      endIndex: destination.index,
    });
    return { [source.droppableId]: reordered };
  }

  current.splice(source.index, 1);
  next.splice(destination.index, 0, target);

  return {
    [source.droppableId]: current,
    [destination.droppableId]: next,
  };
};

export class Board extends Component {
  handleDragEnd = result => {
    if (!result.destination) return;
    const { cardTaskIds, updateCardsTasks } = this.props;
    const source = result.source;
    const destination = result.destination;
    if (result.type === ItemTypes.TASK) {
      const cardsTasks = reorderDragAndDrop({
        tasksMap: cardTaskIds,
        source,
        destination,
      });
      updateCardsTasks({ cardsTasks });
    }
  };

  handleAddNewCard = ({ item }) => {
    const { boardId, addCard } = this.props;
    addCard({ card: { ...item, boardId } });
  };

  renderCards() {
    const { cards } = this.props;
    return cards.map(card => (
      <CardWrapper key={card.id}>
        <Card card={card} />
      </CardWrapper>
    ));
  }

  render() {
    const { boardId } = this.props;
    let content = (
      <NoBoardInfo>
        <H1>No boards</H1>
      </NoBoardInfo>
    );
    if (boardId) {
      content = (
        <DragDropContext onDragEnd={this.handleDragEnd}>
          <CardsContainer>
            {this.renderCards()}
            <CardWrapper>
              <NewItemForm submit={this.handleAddNewCard} placeholder="Add a card..." />
            </CardWrapper>
          </CardsContainer>
        </DragDropContext>
      );
    }
    return content;
  }
}

const mapStateToProps = createStructuredSelector({
  cards: cardsSelector,
  cardTaskIds: tasksForCardsInBoardSelector,
});

export const mapDispatchToProps = dispatch => ({
  addCard: ({ card }) => dispatch(addCard({ card })),
  updateCardsTasks: ({ cardsTasks }) => dispatch(updateCardsTasks({ cardsTasks })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
