import { fetchTrivia } from '../../services/API_TRIVIA';

const LOGIN = 'LOGIN';
const API_TRIVIA_RESQUEST = 'API_TRIVA_RESQUEST';
const API_TRIVIA_SUCCESS = 'API_TRIVIA_SUCCESS';
const API_TRIVIA_FAIL = 'API_TRIVIA_FAIL';

const loginAction = ({ email, name }) => ({
  type: LOGIN,
  payload: {
    email,
    name,
  },
});

const requestAPITrivia = () => ({
  type: API_TRIVIA_RESQUEST,
  payload: {
    requesting: true,
  },
});

const requestTriviaSuccess = (questions) => ({
  type: API_TRIVIA_SUCCESS,
  payload: {
    questions,
    requesting: false,
  },
});

const requestTriviaFail = (error) => ({
  type: API_TRIVIA_FAIL,
  payload: {
    error,
  },
});

const fetchAPI = (num, token) => async (dispatch) => {
  if (num && token) {
    dispatch(requestAPITrivia());
    try {
      const dataTrivia = await fetchTrivia(num, token);
      const questions = dataTrivia.results;
      dispatch(requestTriviaSuccess(questions));
    } catch (error) {
      dispatch(requestTriviaFail(error));
    }
  }
};

export {
  LOGIN,
  loginAction,
  fetchAPI,
  API_TRIVIA_RESQUEST,
  API_TRIVIA_SUCCESS,
  API_TRIVIA_FAIL,
  requestAPITrivia,
  requestTriviaSuccess,
  requestTriviaFail,
};
