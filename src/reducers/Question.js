const INITIAL_STATE = [];

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'GET_QUESTIONS':
    return { questions: action.type };
  default:
    return state;
  }
}
