import React, { Component } from "react";
import Card from "./Card";
import axios from "axios";
import "./CardHelper.css";
import Deck from './Deck';

const API_URL = "https://deckofcardsapi.com/api/deck/new/shuffle/";

export default class CardHelper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      drawnCards: []
    };
  }

  //
  async componentDidMount() {
    const cards = new Deck();
    // cards.reset();
    // const data = await axios.get(API_URL).then(({ data }) => data);

    // const cards = await axios
    //   .get(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=52`)
    //   .then(e => e.data.cards);
    console.log('cards',cards)
    this.setState({ cards:cards.deck });
    
    
  }

   drawNewCard = () => {
    const cards = new Deck();
    // cards.reset();
    console.log('cards',cards.deal());

        return this.setState(prevState => ({
      drawnCards: [
        ...prevState.drawnCards,
        prevState.cards[prevState.cards.length - 1]
      //  this.state.cards.filter(card => prevState.drawnCards.includes(card) )
      ],
      cards: [...prevState.cards.slice(0, -1)]
    }));
  }

  render() {
    console.log(this.state.drawnCards)
    const cards = this.state.drawnCards.length !==0 && this.state.drawnCards.map((e, i) => (
      <ul>
      <li><p style={{color:'red'}}>{e}</p></li>
      </ul>
    ));
    
    const buttonText = () => {
      if (this.state.drawnCards.length > 51) return "Finished!";
      if (this.state.cards.length <= 0) return "No card left";
      else if (this.state.cards.length > 0)
        return `${this.state.cards.length} cards left!`;
    };
    return (
      <div className="CardHandler">
        <button
          className="CardHandler-btn"
          onClick={this.drawNewCard}
          disabled={this.state.cards.length <= 0}
        >
          {buttonText()}
        </button>

        <div className="CardHandler-deck">{cards}</div>
      </div>
    );
  }
}