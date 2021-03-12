import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../trivia.png';

class Header extends Component {
  render() {
    const { name, score, avatar } = this.props;
    return (
      <header>
        <img src={ logo } className="App-logo" alt="logo" />
        <div>
          <img
            alt="user avatar"
            data-testid="header-profile-picture"
            src={ avatar }
          />
          <div>
            <p>Jogador: </p>
            <span data-testid="header-player-name">
              { name }
            </span>
          </div>
        </div>
        <div>
          <p>Score: </p>
          <span data-testid="header-score">
            { score }
          </span>
        </div>
      </header>

    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.name,
  score: state.user.score,
  avatar: state.user.avatar,
});

Header.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Header);
