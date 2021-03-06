import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Timer from 'react-compound-timer';
import Header from '../components/Header';
import { getRequest, shuffleArray } from '../services/index';

const CryptoJS = require('crypto-js');

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      isValid: false,
    };
    this.renderQuestions = this.renderQuestions.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.setingState = this.setingState.bind(this);
  }

  componentDidMount() {
    const { getApi } = this.props;
    getApi();
  }

  setingState() {
    this.setState({ isValid: true });
  }

  handleNext() {
    const { index } = this.state;
    this.setState({
      index: index + 1,
      isValid: false,
    });
  }

  localStorageSave() {
    const { score, name, email } = this.props;

    const playerObj = {
      name,
      assertions: 0,
      score,
      gravatarEmail: email,
    };

    localStorage.setItem('player', JSON.stringify(playerObj));

    const md5Converter = () => {
      const textMd5 = CryptoJS.MD5(email).toString();
      return textMd5;
    };
    // const userEmail = this.md5Converter();
    // { `https://www.gravatar.com/avatar/${md5Converter()}` }
    // 10 + (timer * dificuldade)
    // hard: 3, medium: 2, easy: 1
    const playerArray = [{
      name, score, picture: `https://www.gravatar.com/avatar/${md5Converter()}`,
    }];
    localStorage.setItem('ranking', JSON.stringify(playerArray));
  }

  renderQuestions() {
    const { index, isValid } = this.state;
    const { questions } = this.props;
    return questions.length === 0 ? <h1>Muita calma nessa hora...</h1> : (
      <div>
        <Timer
          initialTime={ 30000 }
          direction="backward"
          onStop={ () => {} }
          onReset={ () => {} }
          onStart={ () => {} }
          checkpoints={ [
            {
              time: 0,
              callback: () => this.setingState(),
            },
          ] }
        >
          {({ start, stop, reset }) => (
            <div>
              <div>
                <Timer.Seconds />
              </div>
              <p data-testid="question-category">
                {questions && questions.length && questions[index].category}
              </p>
              <h5 data-testid="question-text">
                {questions && questions.length && questions[index].question}
              </h5>
              <section>
                {questions
                  && questions.length
                  && questions[index].shuffleAnswers.map((answer, i) => {
                    if (answer === questions[index].correct_answer) {
                      return (
                        <button
                          type="button"
                          key={ i }
                          data-testid="correct-answer"
                          disabled={ isValid }
                          className={ isValid ? 'correct-answer' : '' }
                          onClick={ () => {
                            this.setState({ isValid: true });
                            stop();
                          } }
                        >
                          {answer}
                        </button>);
                    }
                    return (
                      <button
                        type="button"
                        key={ i }
                        data-testid={ `wrong-answer-${i}` }
                        disabled={ isValid }
                        className={ isValid ? 'wrong-answer' : '' }
                        onClick={ () => {
                          this.setState({ isValid: true });
                          stop();
                        } }
                      >
                        {answer}
                      </button>);
                  })}
              </section>
              {isValid
                ? (
                  <button
                    type="button"
                    onClick={ () => {
                      this.handleNext();
                      reset();
                      start();
                    } }
                  >
                    Próxima
                  </button>) : <p />}
            </div>
          )}
        </Timer>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Header />
        <section>
          { this.renderQuestions() }
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getApi: () => dispatch(getRequest()),
});

function questionsWithShuflle(questions) {
  const result = questions.map((question) => ({
    ...question,
    shuffleAnswers: shuffleArray(
      [...question.incorrect_answers, question.correct_answer],
    ),
  }));
  return result;
}

const mapStateToProps = (state) => ({
  questions: questionsWithShuflle(state.game.questions),
  loading: state.game.loading,
  score: state.game.score,
  email: state.game.email,
  name: state.game.name,
});

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    question: PropTypes.string,
    shuffleAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired,
  getApi: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
