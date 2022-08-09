import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      rankingKing: [],
    };
  }

  componentDidMount() {
    const getLocal = JSON.parse(localStorage.getItem('ranking'));
    this.setState({
      rankingKing: getLocal.result.sort((a, b) => {
        const falso = -1;
        if (a.score < b.score) return 1;
        if (a.score > b.score) return falso;
        return 0;
      }),
    });
  }

  render() {
    const { rankingKing } = this.state;
    const { history } = this.props;
    return (
      <div>
        <div>
          <h2 data-testid="ranking-title">Ranking dos Reis</h2>
        </div>
        <section>
          {rankingKing.length !== 0 && rankingKing.map((elem, index) => (
            <div key={ `${elem.name}: player-${index}` }>
              <h3 data-testid={ `player-name-${index}` }>{elem.name}</h3>
              <p data-testId={ `player-score-${index}` }>{elem.score}</p>
            </div>
          ))}
        </section>
        <section>
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ () => history.push('/') }
          >
            Login

          </button>
        </section>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
