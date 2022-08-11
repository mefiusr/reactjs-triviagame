import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MD5 } from 'crypto-js';
import Header from '../components/Header';
import { clear } from '../redux/actions';
import '../styles/feedback.css';

class Feedback extends Component {
  componentDidMount() {
    const { firstLogin } = this.props;
    if (firstLogin) {
      const string = JSON.stringify({ result: [] });
      localStorage.setItem('ranking', string);
    }
  }

  localScore = () => {
    const { score, name, avatar, clearRedux } = this.props;
    const players = JSON.parse(localStorage.getItem('ranking'));
    if (players.result.lenght !== 0) {
      const level = JSON.stringify({
        result: [...players.result, { name, score, picture: `https://www.gravatar.com/avatar/${MD5(avatar).toString()}` }],
      });
      localStorage.setItem('ranking', level);
      clearRedux();
    } else {
      const level = JSON.stringify({
        result: [{ name, score, picture: `https://www.gravatar.com/avatar/${MD5(avatar).toString()}` }],
      });
      localStorage.setItem('ranking', level);
      clearRedux();
    }
  }

  render() {
    const num = 3;
    const { assertions, score, history } = this.props;
    return (
      <>
        <Header />
        <section className="section-feedback">
          <main className="main-feedback">
            { assertions >= num ? <p data-testid="feedback-text">Well Done!</p>
              : <p data-testid="feedback-text">Could be better...</p>}
            <div>
              <p data-testid="feedback-total-score">{`Score: ${score}`}</p>
              <p data-testid="feedback-total-question">{`Assertions: ${assertions}`}</p>
            </div>

            <div className="buttons-feedback">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={ () => {
                  this.localScore();
                  history.push('/');
                } }
                data-testid="btn-play-again"
              >
                Play Again
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                data-testid="btn-ranking"
                onClick={ () => {
                  this.localScore();
                  history.push('/ranking');
                } }
              >
                Ranking

              </button>
            </div>
          </main>
        </section>
      </>

    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  name: state.player.name,
  avatar: state.player.gravatarEmail,
  firstLogin: state.player.firstLogin,
});
const mapDispatchToProps = (dispatch) => ({
  clearRedux: (objClear) => dispatch(clear(objClear)),
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  clearRedux: PropTypes.func.isRequired,
  firstLogin: PropTypes.bool.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
