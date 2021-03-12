import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  constructor(props) {
    super(props);

    this.clearRanking = this.clearRanking.bind(this);
  }

  clearRanking() {
    sessionStorage.clear();
    localStorage.clear();
  }

  render() {
    let rankingList = [];
    const savedRankingList = JSON.parse(localStorage.getItem('ranking'));
    if (savedRankingList !== null) {
      rankingList = savedRankingList;
    }
    return (
      <div>
        <h1 data-testid="ranking-title">RANKING</h1>
        {rankingList.map((user, index) => (
          <div key={ index }>
            <img
              alt="user avatar"
              src={ user.avatar }
            />
            <p data-testid={ `player-name-${index}` }>{ user.name }</p>
            <p data-testid={ `player-score-${index}` }>{ user.score }</p>
          </div>
        ))}
        <Link to="/">
          <button type="button" data-testid="btn-go-home">
            Home
          </button>
        </Link>
        <button
          type="button"
          onClick={ this.clearRanking }
        >
          Limpar Ranking
        </button>
      </div>
    );
  }
}

export default Ranking;
