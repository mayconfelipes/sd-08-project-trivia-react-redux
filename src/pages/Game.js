import React from 'react';
import Header from '../component/Header';
import Questions from '../component/Questions';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

class Game extends React.Component {
  render() {
    return (
      <div>
        <h1>OLÁ</h1>
        <Header />
        <Questions />
      </div>
    );
  }
}

export default Game;
