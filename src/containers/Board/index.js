import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import AddCard from '../../components/AddCard';
import Card from '../Card';
import { cardsSelector } from '../Card/selectors';
import { addCard } from '../Card/actions';
import { metrics } from '../../theme';

const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const CardWrapper = styled.div`
  margin: ${metrics.baseMargin}px;
`;

export class Board extends Component {
  renderCards() {
    const { cards } = this.props;
    return cards.map(card => (
      <CardWrapper key={card.id}>
        <Card card={card} />
      </CardWrapper>
    ));
  }

  render() {
    const { addCard } = this.props;
    return (
      <CardsContainer>
        {this.renderCards()}
        <CardWrapper>
          <AddCard addCard={addCard} />
        </CardWrapper>
      </CardsContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  cards: cardsSelector,
});

export const mapDispatchToProps = dispatch => ({
  addCard: ({ card }) => dispatch(addCard({ card })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
