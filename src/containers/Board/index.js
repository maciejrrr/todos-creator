import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import AddCard from '../../components/AddCard';
import Card from '../Card';
import { cardsSelector } from './selectors';
import { addCard } from './actions';
import { metrics } from '../../theme';

const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const FormContainer = styled.div`
  margin: ${metrics.baseMargin}px;
`;

export class Board extends Component {
  renderCards() {
    const { cards } = this.props;
    return cards.map(card => <Card key={card.id} card={card} />);
  }

  render() {
    const { addCard } = this.props;
    return (
      <CardsContainer>
        {this.renderCards()}
        <FormContainer>
          <AddCard addCard={addCard} />
        </FormContainer>
      </CardsContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  cards: cardsSelector,
});

const mapDispatchToprops = dispatch => ({
  addCard: ({ card }) => dispatch(addCard({ card })),
});

export default connect(mapStateToProps, mapDispatchToprops)(Board);
