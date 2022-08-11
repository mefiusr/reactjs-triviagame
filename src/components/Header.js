import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import trivia from '../img/trivia.png';
import '../styles/header.css';

class Header extends Component {
  render() {
    const { name, imagem, score } = this.props;
    return (
      <header className="header">
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${md5(imagem).toString()}` }
          alt="imagem do seu gravatar"
          className="img-header"
        />
        <img src={ trivia } alt="logo header" className="logo-header" />
        <div className="div-header">
          <p
            className="p-header"
            data-testid="header-player-name"
          >
            { `Player: ${name}` }

          </p>
          <p className="p-header" data-testid="header-score">{`Points: ${score}`}</p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  imagem: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.player.name,
  imagem: state.player.gravatarEmail,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
