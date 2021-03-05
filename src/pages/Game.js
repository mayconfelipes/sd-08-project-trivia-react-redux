import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../componente/Header';
import '../css/game.css';

const ONE_SECOND = 1000;
const TEN = 10;

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      index: 0,
      loadQuestions: false,
      answer: false,
      responseTimeInSeconds: 30,
      points: 0,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getQuestionsFromApi();
    // https://qastack.com.br/programming/36299174/setinterval-in-a-react-app
    const intervalId = setInterval(() => {
      const { responseTimeInSeconds } = this.state;
      const newCount = responseTimeInSeconds - 1;
      if (newCount >= 0) {
        this.setState({ responseTimeInSeconds: newCount });
      } else {
        clearInterval(intervalId);
      }
    }, ONE_SECOND);
    const player = {
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
    };
    localStorage.setItem('state', JSON.stringify({ player }));
  }

  getQuestionsFromApi() {
    const token = localStorage.getItem('token');
    fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((response) => response.json())
      .then((data) => this.setState({
        questions: data.results,
      }, () => {
        this.setState({ loadQuestions: true });
      }));
  }

  handleClick({ target }) {
    const level = {
      hard: 3,
      medium: 2,
      easy: 1,
    };

    const { name } = target;
    const { questions, index, responseTimeInSeconds, points } = this.state;
    const { difficulty } = questions[index];
    const { history } = this.props;

    if (name === 'correct-btn') {
      const total = TEN + (level[difficulty] * responseTimeInSeconds) + points;
      console.log(total, difficulty, responseTimeInSeconds);

      this.setState({
        points: total,
      });

      const storage = JSON.parse(localStorage.getItem('state'));
      storage.player.score = total;
      localStorage.setItem('state', JSON.stringify(storage));
    }

    if (name === 'next') {
      const limit = 4;

      if (index < limit) {
        this.setState({
          index: index + 1,
          responseTimeInSeconds: 30,
          answer: false,
        });
      } else {
        history.push('/feedback');
      }
    }

    this.setState({
      answer: true,
    });
  }

  renderQuestions(questions, index, answer, responseTimeInSeconds) {
    return (
      <div>
        <h2>Perguntas</h2>
        <div className="questions">
          <div className="category">
            <span data-testid="question-category">
              {
                `Categoria: ${questions[index].category}`
              }
            </span>
          </div>
          <div className="question">
            <span data-testid="question-text">
              {
                `Pergunta: ${questions[index].question}`
              }
            </span>
          </div>
          <div className="answer">
            <button
              type="button"
              key="correct"
              data-testid="correct-answer"
              className={ answer ? 'correctAnswer' : '' }
              name="correct-btn"
              onClick={ this.handleClick }
              disabled={ responseTimeInSeconds === 0 }
            >
              { questions[index].correct_answer }
            </button>
            { questions[index].incorrect_answers
              .map((item, itemIndex) => (
                <button
                  type="button"
                  key={ itemIndex }
                  data-testid={ `wrong-answer-${itemIndex}` }
                  className={ answer ? 'wrongAnswer' : '' }
                  name="incorrect-btn"
                  onClick={ this.handleClick }
                  disabled={ responseTimeInSeconds === 0 }
                >
                  { item }
                </button>)) }
          </div>
          <button
            type="button"
            data-testid="btn-next"
            name="next"
            className={ answer ? '' : 'btn-visible' }
            onClick={ this.handleClick }
          >
            Próxima
          </button>
          <span>
            Tempo de resposta:
            { responseTimeInSeconds }
          </span>
        </div>
      </div>
    );
  }

  render() {
    const {
      questions, index, loadQuestions, answer, responseTimeInSeconds, points,
    } = this.state;
    if (!loadQuestions) return '';
    console.log(questions);
    return (
      <div>
        Pagina do Jogo
        <Header />
        { this.renderQuestions(questions, index, answer, responseTimeInSeconds, points) }
      </div>
    );
  }
}

export default Game;

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
