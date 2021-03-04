<<<<<<< HEAD
import { QUESTIONS_REQUEST, QUESTIONS_REQUEST_SUCCESS, TOKEN_REQUEST, TOKEN_REQUEST_SUCCESS, UPDATE_SCORE, urlQuestions, urlToken } from '../consts';
=======
import { ADD_CORRECT_ANSWER, TOKEN_REQUEST,
  TOKEN_REQUEST_SUCCESS, UPDATE_SCORE, urlToken } from '../consts';
>>>>>>> 541e54e8f132b126950b72d9a87e96e07906344a

export const login = (value) => ({ type: 'LOGIN', payload: value });
export const logout = (value) => ({ type: 'LOGOUT', payload: value });

const apiFetchTokenRequest = () => ({
  type: TOKEN_REQUEST,
});

const apiFetchTokenSuccess = (token) => ({
  type: TOKEN_REQUEST_SUCCESS,
  payload: token,
});

export const fetchApiToken = () => (dispatch) => {
  dispatch(apiFetchTokenRequest());
  return fetch(urlToken)
    .then((response) => response.json())
    .then((data) => {
      dispatch(apiFetchTokenSuccess(data.token));
      localStorage.token = data.token;
    })
    .catch((error) => console.log(error));
};

<<<<<<< HEAD
export const updateScore = (score) => ({ type: UPDATE_SCORE, payload: score });

export const apiFetchQuestionsRequest = () => ({
  type: QUESTIONS_REQUEST,
});

export const apiFetchQuestionsSuccess = (questions) => ({
  type: QUESTIONS_REQUEST_SUCCESS,
  payload: { questions },
})

export const fetchApiQuestions = (token) => (dispatch) => {
  dispatch(apiFetchQuestionsRequest());
  return fetch(urlQuestions(token))
  .then((json) => json.json())
  .then((data) => dispatch(apiFetchQuestionsSuccess(data)))
  .catch((error) => console.log(error));
}
=======
export const updateScoreAction = (score) => ({ type: UPDATE_SCORE, payload: score });

export const addCorrectAnswerAction = () => ({ type: ADD_CORRECT_ANSWER });
>>>>>>> 541e54e8f132b126950b72d9a87e96e07906344a
