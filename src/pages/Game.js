import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Timer from 'react-compound-timer';
import Header from '../components/Header';
import { getRequest, shuffleArray } from '../services/index';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      isValid: false,
    };
    this.renderQuestions = this.renderQuestions.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  componentDidMount() {
    const { getApi } = this.props;
    getApi();

    const QUESTION_TIME = 10000;
    setTimeout(
      () => this.setState({ isValid: true }),
      QUESTION_TIME,
    );
  }

  handleNext() {
    const { index } = this.state;
    this.setState({
      index: index + 1,
    });
  }

  renderQuestions() {
    const { index, isValid } = this.state;
    const { questions } = this.props;
    console.log(questions);
    const questionsArray = questions && questions.length
      ? [...questions[index].incorrect_answers, questions[index].correct_answer] : [];
    shuffleArray(questionsArray);
    return questions.length === 0 ? <h1>Muita calma nessa hora...</h1> : (
      <div>
        <p data-testid="question-category">
          {questions && questions.length && questions[index].category}
        </p>
        <h5 data-testid="question-text">
          {questions && questions.length && questions[index].question}
        </h5>
        <section>
          {questions && questions.length && questionsArray.map((answer, i) => {
            if (answer === questions[index].correct_answer) {
              return (
                <button
                  type="button"
                  key={ i }
                  data-testid="correct-answer"
                  disabled={ isValid }
                  className={ isValid ? 'correct-answer' : '' }
                  onClick={ () => this.setState({ isValid: true }) }
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
                onClick={ () => this.setState({ isValid: true }) }
              >
                {answer}
              </button>);
          })}
        </section>
        <button data-testid="btn-next" type="button">Próxima</button>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Header />
        <section>
          <Timer
            initialTime={ 10000 }
            direction="backward"
          >
            {() => (
              <div>
                <Timer.Seconds />
              </div>
            )}
          </Timer>
          {this.renderQuestions() }
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getApi: () => dispatch(getRequest()),
});

const mapStateToProps = (state) => ({
  questions: state.game.questions,
  loading: state.game.loading,
});

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    question: PropTypes.string,
  })).isRequired,
  getApi: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
