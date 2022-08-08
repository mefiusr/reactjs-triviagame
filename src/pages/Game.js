import styled from 'styled-components';
import React, { Component } from 'react';
import Header from '../components/Header';
import '../styles/style.css';

class Game extends Component {
  buttonGreen = styled.button`
  border: 10px solid rgb(6, 240, 15);
  `;

  buttonRed = styled.button`
  border: 3px solid red;
  `;

  render() {
    return (
      <>
        <Header />
        <button
          type="button"
          onClick={ () => this.addStyle() }
        >
          TESTE
        </button>
      </>
    );
  }
}

export default Game;
