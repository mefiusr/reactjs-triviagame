import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { fetchTrivia } from '../services';
import { questions } from '../redux/actions';
import '../styles/style.css';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      checkTrivia: false,
      buttonCorrect: '',
      buttonIncorrect: '',
      timer: 30,
      desactiveButton: false,
    };
  }

  componentDidMount() {
    this.getQuestions();
    this.timer();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.timer === 0) {
      this.addStyle();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  addStyle = () => {
    this.setState({
      timer: 0,
      buttonCorrect: 'buttonCorrect',
      buttonIncorrect: 'buttonIncorrect',
      desactiveButton: true,
    });
  };

  timer = () => {
    const SECONDS = 1000;
    this.timerID = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
    }, SECONDS);
  };

  getQuestions = async () => {
    const { saveTrivia } = this.props;
    const result = await fetchTrivia(localStorage.getItem('token'));
    const number05 = 0.5;
    if (result.response_code === 0) {
      this.setState({
        checkTrivia: false,
      });
    } else {
      this.setState({
        checkTrivia: true,
      });
    }
    const resultMap = result.results.map((elem) => ({
      ...elem,
      incorrect_answers: [...elem.incorrect_answers, elem.correct_answer].sort(
        () => Math.random() - number05,
      ),
    }));
    saveTrivia(resultMap);
  };

  render() {
    const { checkTrivia,
      buttonCorrect, buttonIncorrect, timer, desactiveButton } = this.state;
    const { questoes } = this.props;
    return (
      <div>
        <Header />
        <main>
          <p>{timer}</p>
          {checkTrivia ? (
            <Redirect to="/" />
          ) : (
            questoes.map((elem, index) => (
              <div key={ `Perguntas ${index} ` }>
                <div>
                  <p data-testid="question-category">{elem.category}</p>
                  <p data-testid="question-text">{elem.question}</p>
                </div>
                <div>
                  {elem.type === 'boolean'
                    ? elem.incorrect_answers.map((values) => (
                      <div
                        key={ `respostas booleanas ${values} ${index}` }
                        data-testid="answer-options"
                      >
                        {elem.correct_answer === values ? (
                          <button
                            type="button"
                            disabled={ desactiveButton }
                            className={ buttonCorrect }
                            data-testid="correct-answer"
                            onClick={ this.addStyle }
                          >
                            {values}
                          </button>
                        ) : (
                          <button
                            type="button"
                            disabled={ desactiveButton }
                            className={ buttonIncorrect }
                            data-testid={ `wrong-answer-${index}` }
                            onClick={ this.addStyle }
                          >
                            {values}
                          </button>
                        )}
                      </div>
                    ))
                    : elem.incorrect_answers.map((newValues) => (
                      <div
                        key={ `respostas múltiplas ${newValues} ${index}` }
                        data-testid="answer-options"
                      >
                        {elem.correct_answer === newValues ? (
                          <button
                            type="button"
                            disabled={ desactiveButton }
                            className={ buttonCorrect }
                            data-testid="correct-answer"
                            onClick={ this.addStyle }
                          >
                            {newValues}
                          </button>
                        ) : (
                          <button
                            type="button"
                            disabled={ desactiveButton }
                            className={ buttonIncorrect }
                            data-testid={ `wrong-answer-${index}` }
                            onClick={ this.addStyle }
                          >
                            {newValues}
                          </button>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            ))[0]
          )}
        </main>
      </div>
    );
  }
}

Game.propTypes = {
  questoes: PropTypes.array,
  saveTrivia: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  questoes: state.player.questions,
});

const mapDispatchToProps = (dispatch) => ({
  saveTrivia: (trivia) => dispatch(questions(trivia)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
