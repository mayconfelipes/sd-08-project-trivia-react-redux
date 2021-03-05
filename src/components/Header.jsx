import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      gravatarImageLink: '',
    };

    this.fetchGravatar2 = this.fetchGravatar2.bind(this);
  }

  componentDidMount() {
    this.fetchGravatar2();
    const recoveryPlayer = JSON.parse(localStorage.getItem('player'));
    if (recoveryPlayer !== null) {
      // fzd despatch qnd tiver o redux.
    }
  }

  fetchGravatar2() {
    const { email } = this.props;
    const md = md5(email).toString();
    const imgLink = `https://www.gravatar.com/avatar/${md}`;
    this.setState({ gravatarImageLink: imgLink });
  }

  render() {
    // const recoveryPlayer = JSON.parse(localStorage.getItem('player'));
    const { gravatarImageLink } = this.state;
    const { name, score } = this.props;
    return (
      <div>
        <h2>Trybe Trivia</h2>
        <img
          data-testid="header-profile-picture"
          src={ gravatarImageLink }
          alt="avatar"
        />
        <h3 data-testid="header-player-name">{ name }</h3>
        <span data-testid="header-score">{score}</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  email: state.player.email,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Header);
