import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import '../styles/header.css';

class Header extends Component {
  render() {
    const { name, imagem, score } = this.props;
    return (
      <header className="header">
        <p className="p-header" data-testid="header-player-name">{ name }</p>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${md5(imagem).toString()}` }
          alt="imagem do seu gravatar"
        />
        <p className="p-header" data-testid="header-score">{score}</p>

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
