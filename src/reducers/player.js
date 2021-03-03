import { LOGIN, CORRECT } from '../actions';

const PLAYER_INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
};

const playerReducer = (state = PLAYER_INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      player: {
        ...state.player,
        name: action.payload.name,
        gravatarEmail: action.payload.email,
      },
    };
  case CORRECT:
    return {
      ...state,
      player: {
        ...state.player,
        assertions: state.player.assertions + 1,
        score: state.player.score + action.payload,
      },
    };
  default:
    return state;
  }
};

export default playerReducer;
