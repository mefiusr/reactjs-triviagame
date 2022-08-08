import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { fetchTrivia } from '../services';
import { questions } from '../redux/actions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      checkTrivia: false,
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

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
      incorrect_answers: [...elem.incorrect_answers, elem.correct_answer]
        .sort(() => Math.random() - number05),
    }));
    console.log(result.results);
    console.log(resultMap);
    saveTrivia(resultMap);
  };

  render() {
    const { checkTrivia } = this.state;
    const { questoes } = this.props;
    return (
      <div>
        <Header />
        <main>
          {checkTrivia ? <Redirect to="/" /> : (
            questoes.map((elem, index) => (
              <div key={ `Perguntas ${index} ` }>
                <div>
                  <p data-testid="question-category">{elem.category}</p>
                  <p data-testid="question-text">{elem.question}</p>
                </div>
                <div>
                  {elem.type === 'boolean' ? elem.incorrect_answers.map((values) => (
                    <div
                      key={ `respostas booleanas ${values} ${index}` }
                      data-testid="answer-options"
                    >
                      {elem.correct_answer === values ? (
                        <button
                          type="button"
                          data-testid="correct-answer"
                        >
                          {values}
                        </button>)
                        : (
                          <button
                            type="button"
                            data-testid={ `wrong-answer-${index}` }
                          >
                            {values}
                          </button>
                        )}
                    </div>
                  )) : elem.incorrect_answers.map((newValues) => (
                    <div
                      key={ `respostas múltiplas ${newValues} ${index}` }
                      data-testid="answer-options"
                    >
                      {elem.correct_answer === newValues ? (
                        <button
                          type="button"
                          data-testid="correct-answer"
                        >
                          {newValues}
                        </button>)
                        : (
                          <button
                            type="button"
                            data-testid={ `wrong-answer-${index}` }
                          >
                            {newValues}

                          </button>)}
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
