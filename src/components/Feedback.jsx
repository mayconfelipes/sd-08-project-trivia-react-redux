import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Feedback extends React.Component {
  constructor() {
    super();

    this.generateMessage = this.generateMessage.bind(this);
  }

  generateMessage() {
    const { assertions } = JSON.parse(localStorage.getItem('state')).player;
    const ASSERT_NUM = 3;
    if (assertions < ASSERT_NUM) {
      return 'Podia ser melhor...';
    }
    return 'Mandou bem!';
  }

  render() {
    const { email, playerName, score } = this.props;
    const emailHash = md5(email).toString();
    return (
      <>
        <section className="game-header">
          <div>
            <img
              data-testid="header-profile-picture"
              src={ `https://www.gravatar.com/avatar/${emailHash}` }
              alt="player-img"
            />
            Jogador:
            <span data-testid="header-player-name">{ playerName }</span>
          </div>
          <div>
            Pontos:
            <span data-testid="header-score">{ score }</span>
          </div>
        </section>
        <section>
          <div data-testid="feedback-text">{ this.generateMessage() }</div>
        </section>
      </>
    );
  }
}
Feedback.propTypes = {
  email: PropTypes.string,
  playerName: PropTypes.string,
  score: PropTypes.number,
};
Feedback.defaultProps = {
  email: '',
  playerName: '',
  score: 0,
};
const mapStateToProps = (state) => ({
  email: state.login.email,
  playerName: state.login.playerName,
  score: state.update.score,
});
// const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, null)(Feedback);
