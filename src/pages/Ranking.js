import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/ranking.css';

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
      <main className="main-ranking">
        <div>
          <h2 data-testid="ranking-title">Kings Ranking</h2>
        </div>
        <section>
          {rankingKing.length !== 0 && rankingKing.map((elem, index) => (
            <div key={ `${elem.name}: player-${index}` }>
              <h4 data-testid={ `player-name-${index}` }>{`Player: ${elem.name}`}</h4>
              <h4 data-testid={ `player-score-${index}` }>{`Score: ${elem.score}`}</h4>
            </div>
          ))}
        </section>
        <section>
          <button
            className="btn btn-secondary"
            type="button"
            data-testid="btn-go-home"
            onClick={ () => history.push('/') }
          >
            Login

          </button>
        </section>
      </main>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
