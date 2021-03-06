import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './header';
import { fetchTriviaAPI as fetchTriviaAPIAction } from '../Redux/actions';
import './Trivia.css';

const INITIAL_STATE = {
  btnTrue: '',
  btnFalse: '',
  disabled: false,
  nextQuestion: false,
};

class Trivia extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      question: [],
      btnTrue: '',
      btnFalse: '',
      disabled: false,
      number: 0,
      nextQuestion: false,
      remainingSeconds: 30,
    };
    this.renderQuestions = this.renderQuestions.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
    this.handleTimer = this.handleTimer.bind(this);
  }

  async componentDidMount() {
    const { fetchTriviaAPI } = this.props;
    const token = localStorage.getItem('token');
    await fetchTriviaAPI(token);
    await this.loadingData();
    this.handleTimer();
  }

  handleTimer() {
    const second = 1000;
    const timerId = setInterval(this.handleTimer, second);
    const { remainingSeconds } = this.state;
    this.setState({ timerId });
    if (remainingSeconds > 0) {
      this.setState((state) => ({ remainingSeconds: state.remainingSeconds - 1 }));
    }
    if (remainingSeconds === 0) {
      const { timerId: timer } = this.state;
      clearInterval(timer);
      this.handleClick();
    }
  }

  handleClick() {
    this.setState({
      btnTrue: 'button-true',
      btnFalse: 'button-false',
      disabled: true,
      nextQuestion: true,
    });
    const { timerId } = this.state;
    clearInterval(timerId);
  }

  handleNextQuestion() {
    const { number } = this.state;
    this.setState({
      ...INITIAL_STATE,
      number: number + 1,
      remainingSeconds: 30,
      timerId: 0,
    });
  }

  async loadingData() {
    const { data } = this.props;
    if (data !== undefined) {
      this.setState({
        loading: false,
        question: data,
      });
    }
  }

  renderButtonNext() {
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ this.handleNextQuestion }
      >
        Próxima
      </button>
    );
  }

  renderQuestions() {
    const {
      question,
      btnTrue,
      btnFalse,
      disabled,
      number,
      nextQuestion,
      remainingSeconds,
    } = this.state;
    const FIVE_QUESTIONS = 5;
    if (number <= FIVE_QUESTIONS) {
      return (
        <>
          <h3
            data-testid="question-category"
          >
            {question[number].category}
          </h3>
          <span
            data-testid="question-text"
          >
            {question[number].question}
          </span>
          <div>
            <button
              type="button"
              className={ btnTrue }
              data-testid="correct-answer"
              onClick={ this.handleClick }
              disabled={ disabled }
            >
              {question[number].correct_answer}
            </button>
            {question[number].incorrect_answers.map((answer, index) => (
              <button
                key={ index }
                type="button"
                data-testid={ `wrong-answer-${index}` }
                onClick={ this.handleClick }
                className={ btnFalse }
                disabled={ disabled }
              >
                {answer}
              </button>
            ))}
            {nextQuestion && this.renderButtonNext()}
          </div>
          <p>{ remainingSeconds }</p>
        </>
      );
    }
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
        <Header />
        {loading ? <p>Loading...</p> : this.renderQuestions()}
      </div>
    );
  }
}

Trivia.propTypes = {
  fetchTriviaAPI: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  data: state.fetchAPI.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTriviaAPI: (token) => dispatch(fetchTriviaAPIAction(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
