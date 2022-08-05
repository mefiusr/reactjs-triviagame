import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchTrivia } from '../services';
import { questions } from '../redux/actions';
import { Redirect } from 'react-router-dom';

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
    const result = fetchTrivia(localStorage.getItem('token'));
    if (result.response_code === 0) {
      this.setState({
        checkTrivia: false,
      });
    } else {
      this.setState({
        checkTrivia: true,
      });
    }
    saveTrivia(result.results);
  };

  render() {
    const { checkTrivia } = this.state;
    const { questoes } = this.props;
    return (
      <div>
         <Header />
        <main>
         {checkTrivia ? <Redirect to='/' /> : (
          questoes.map((elem, index) => {
            <div>
            <div>
              <p data-testid='question-category'>{elem.category}</p>
              <p data-testid='question-text'>{elem.question}</p>
            </div>
            <div>
              <button data-testid='correct-answer' >{elem.correct_answer}</button>
              {elem.type === 'boolean' ? <button type='button' data-testid={`wrong-answer-${index}`}></button> : 
              elem.incorrect_answers.map((incorrect) => {
                <button type='button' data-testid={`wrong-answer-${index}`}>{incorrect}</button>
              })}
            </div>
            </div>
          }),
         )};
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questoes: state.player.questions,
});

const mapDispatchToProps = (dispatch) => ({
  saveTrivia: (trivia) => dispatch(questions(trivia)),
});

export default connect(null, mapDispatchToProps)(Game);
