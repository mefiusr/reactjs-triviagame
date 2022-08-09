import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { clear } from '../redux/actions';

class Feedback extends Component {
  /*  constructor() {
    super();
    this.state = {
      ranking: true,
    };
  } */

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
        result: [...players.result, { name, score, picture: `https://opentdb.com/api.php?amount=5&token=${avatar}` }],
      });
      localStorage.setItem('ranking', level);
      clearRedux();
    } else {
      const level = JSON.stringify({
        result: [{ name, score, picture: `https://opentdb.com/api.php?amount=5&token=${avatar}` }],
      });
      localStorage.setItem('ranking', level);
      clearRedux();
    }
  }

  render() {
    const num = 3;
    const { assertions, score, history } = this.props;
    return (
      <div>
        <Header />
        { assertions >= num ? <p data-testid="feedback-text">Well Done!</p>
          : <p data-testid="feedback-text">Could be better...</p>}
        <div>
          <p data-testid="feedback-total-score">{score}</p>
          <p data-testid="feedback-total-question">{assertions}</p>
        </div>
        <button
          type="button"
          onClick={ () => {
            this.localScore();
            history.push('/');
          } }
          data-testid="btn-play-again"
        >
          Play Again
        </button>
        <section>

          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ () => {
              this.localScore();
              history.push('/ranking');
            } }
          >
            Ranking

          </button>
        </section>
      </div>

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
