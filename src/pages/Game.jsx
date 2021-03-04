import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';
import CardQuestion from './CardQuestion';
import { toggleSelected } from '../redux/actions';

class Game extends React.Component {
  constructor() {
    super();
    this.handleCLick = this.handleCLick.bind(this);
    this.state = {
      questionIndex: 0,
    };
  }

  handleCLick() {
    const questionsSize = 4;
    const { questionIndex } = this.state;
    const { toggleSelectedProp } = this.props;
    if (questionIndex < questionsSize) {
      toggleSelectedProp();
      this.setState((previousState) => ({
        questionIndex: previousState.questionIndex + 1,
      }));
    }
  }

  // função retirado do site https://javascript.info/task/shuffle
  shuffle(array) {
    const half = 0.5;
    const sortedOption = array.sort(() => Math.random() - half);
    return sortedOption;
  }

  mapQuestions(questions) {
    return questions.map((question) => {
      const questionInfo = {
        category: question.category,
        type: question.type,
        difficulty: question.difficulty,
        question: question.question,
      };
      const correctOption = [
        { option: question.correct_answer, className: 'correct-answer' },
      ];
      const wrongOptions = question.incorrect_answers.map((wrongOption) => ({
        option: wrongOption,
        className: 'wrong-answer',
      }));
      const options = [...correctOption, ...wrongOptions];
      const shuffleOptions = this.shuffle(options);
      questionInfo.options = shuffleOptions;
      return questionInfo;
    });
  }

  render() {
    const { questionIndex } = this.state;
    const { questions, selected } = this.props;
    const shuffleOptions = this.mapQuestions(questions);
    return (
      <div>
        <Header />
        <div>GAME</div>
        <CardQuestion questions={ shuffleOptions[questionIndex] } />
        {selected ? (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.handleCLick }
          >
            Próximo
          </button>
        ) : (
          ''
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.login.questions,
  selected: state.game.selected,
});

const mapDispatchToProps = (dispatch) => ({
  toggleSelectedProp: () => dispatch(toggleSelected()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleSelectedProp: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};
