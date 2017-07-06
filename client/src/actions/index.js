export const FETCH_QUESTION_REQUEST = 'FETCH_QUESTION_REQUEST';
export const fetchQuestionRequest = () => ({
  type: FETCH_QUESTION_REQUEST });

export const FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS';
export const fetchQuestionSuccess = (questions) => ({
  type: FETCH_QUESTION_SUCCESS, questions });

export const FETCH_QUESTION_FAILURE = 'FETCH_QUESTION_FAILURE';
export const fetchQuestionFailure = () => ({
  type: FETCH_QUESTION_FAILURE });

export const FETCH_SCORE = 'FETCH_SCORE';
export const fetchScore = () => ({
  type: FETCH_SCORE });

export const FETCH_QUESTION_NUMBER = 'FETCH_QUESTION_NUMBER';
export const fetchQuestionNumber = () => ({
  type: FETCH_QUESTION_NUMBER });

export const CREATE_USER = 'CREATE_USER';
export const createUser = (currentUser) => ({
  type: CREATE_USER, currentUser });

import * as Cookies from 'js-cookie';

export const score = () => dispatch => {
  dispatch(fetchScore);
};

export const questionNumber = () => dispatch => {
  dispatch(fetchQuestionNumber);
};

export const fetchQuestion = () => dispatch => {
  dispatch(fetchQuestionRequest());
  const accessToken = Cookies.get('accessToken');
  return fetch('/api/questions', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
      .then(data => {
        if (!data.ok) {
          return dispatch(fetchQuestionFailure());
        }
        return data.json();
      }).then(response => {
        return dispatch(fetchQuestionSuccess(response));
      });
};
