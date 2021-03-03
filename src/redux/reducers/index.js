// Reducers

import { LOGIN, INPUT } from '../actions';

const initialState = {
  email: '',
  name: '',
};

function reducer(state = initialState, action) {
  switch (action.type) {
  case INPUT:
    return {
      ...state,
      [Object.keys(action)[1]]: Object.values(action)[1],
    };
  case LOGIN:
    return {
      ...state,
    };
  default:
    return state;
  }
}

export default reducer;
