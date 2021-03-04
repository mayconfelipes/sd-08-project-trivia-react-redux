import { getToken, getQuestions } from '../services/api';

export const COUNTDOWN = 'COUNTDOWN';
export const STOP_CLOCK = 'STOP_CLOCK';
export const GET_HASH_EMAIL = 'GET_HASH_EMAIL';
export const FINISH_QUESTION = 'END_QUESTION';
export const INPUT_VALUE = 'INPUT_VALUE';
export const REQUEST_TRIVIA_TOKEN = 'REQUEST_TRIVIA_TOKEN';
export const REQUEST_TRIVIA_TOKEN_SUCCESS = 'REQUEST_TRIVIA_TOKEN_SUCCESS';
export const REQUEST_TRIVIA_TOKEN_ERROR = 'REQUEST_TRIVIA_TOKEN_ERROR';

export const countDown = () => ({
  type: COUNTDOWN,
});

export const stopClock = () => ({
  type: STOP_CLOCK,
  payload: { seconds: '', paused: true }
});

export const finishQuestion = () => ({
  type: FINISH_QUESTION,
});

export const getingHashEmail = (payload) => ({
  type: GET_HASH_EMAIL,
  payload,
});

export const saveInputs = (payload) => ({
  type: INPUT_VALUE,
  payload,
});

export const requestTriviaToken = () => ({
  type: REQUEST_TRIVIA_TOKEN,
  payload: {
    isFetching: true,
  },
});

export const requestTriviaTokenSuccess = (token) => ({
  type: REQUEST_TRIVIA_TOKEN_SUCCESS,
  payload: {
    token,
    isFetching: false,
  },
});

export const requestTriviaTokenError = (error) => ({
  type: REQUEST_TRIVIA_TOKEN_ERROR,
  payload: {
    error,
    isFetching: false,
  },
});

export const fetchTriviaToken = () => async (dispatch) => {
  dispatch(requestTriviaToken());

  try {
    const tokenResponse = await getToken();
    localStorage.setItem('token', JSON.stringify(tokenResponse.token));
    dispatch(requestTriviaTokenSuccess(tokenResponse.token));
  } catch (error) {
    dispatch(requestTriviaTokenError(error));
  }
};

export const REQUEST_TRIVIA_QUESTIONS = 'REQUEST_TRIVIA_QUESTIONS';
export const REQUEST_TRIVIA_QUESTIONS_SUCCESS = 'REQUEST_TRIVIA_QUESTIONS_SUCCESS';
export const REQUEST_TRIVIA_QUESTIONS_ERROR = 'REQUEST_TRIVIA_QUESTIONS_ERROR';

export const requestTriviaQuestions = () => ({
  type: REQUEST_TRIVIA_QUESTIONS,
  payload: {
    isFetching: true,
  },
});

export const requestTriviaQuestionsSuccess = (questions) => ({
  type: REQUEST_TRIVIA_QUESTIONS_SUCCESS,
  payload: {
    questions,
    isFetching: false,
  },
});

export const requestTriviaQuestionsError = (error) => ({
  type: REQUEST_TRIVIA_QUESTIONS_SUCCESS,
  payload: {
    error,
    isFetching: false,
  },
});

export const fetchTriviaQuestions = (questionsAmount, token) => async (dispatch) => {
  dispatch(requestTriviaQuestions());

  try {
    const questionsResponse = await getQuestions(questionsAmount, token);
    const foo = questionsResponse.results.map;
    dispatch(requestTriviaQuestionsSuccess(questionsResponse.results));
  } catch (error) {
    dispatch(requestTriviaQuestionsError(error));
  }
};
