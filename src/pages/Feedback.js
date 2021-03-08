import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  constructor() {
    super();

    this.renderSuccess = this.renderSuccess.bind(this);
    this.renderSad = this.renderSad.bind(this);
    this.renderConditional = this.renderConditional.bind(this);
    this.handleHome = this.handleHome.bind(this);
    this.handleRanking = this.handleRanking.bind(this);
  }

  handleHome() {
    const { history } = this.props;
    history.push('/');
  }

  handleRanking() {
    const { history } = this.props;
    history.push('/ranking');
  }

  renderSuccess() {
    return (
      <h1 data-testid="feedback-text">Mandou bem!</h1>
    );
  }

  renderSad() {
    return (
      <h1 data-testid="feedback-text">Podia ser melhor...</h1>
    );
  }

  renderConditional() {
    const { assertions } = this.props;
    const number = 3;
    if (assertions && assertions >= number) {
      return (
        <div>
          <h4 data-testid="feedback-text">Mandou bem!</h4>
          <h4>{ `Você acertou ${assertions} perguntas :)` }</h4>
        </div>
      );
    }
    return (
      <div>
        <h4 data-testid="feedback-text">Podia ser melhor...</h4>
        <h4>{ `Você acertou ${assertions} perguntas :(` }</h4>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Header />
        <h1>Feedback Page</h1>
        { this.renderConditional() }
        <button
          type="submit"
          className="button-jogar"
          data-testid="btn-play-again"
          onClick={ this.handleHome }
        >
          Jogar novamente
        </button>
        <button
          type="button"
          className="button-jogar"
          data-testid="btn-ranking"
          onClick={ this.handleRanking }
        >
          Ver Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.game.assertions,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
