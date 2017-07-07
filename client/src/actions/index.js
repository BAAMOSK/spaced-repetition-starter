import * as Cookies from 'js-cookie';
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

export const FETCH_QUESTION_INDEX = 'FETCH_QUESTION_INDEX';
export const fetchQuestionIndex = () => ({
  type: FETCH_QUESTION_INDEX });

export const FETCH_QUESTION_NUMBER = 'FETCH_QUESTION_NUMBER';
export const fetchQuestionNumber = () => ({
  type: FETCH_QUESTION_NUMBER });

export const CREATE_USER = 'CREATE_USER';
export const createUser = (currentUser) => ({
  type: CREATE_USER, currentUser });

export const MAKE_GUESS = 'MAKE_GUESS';
export const makeGuess = (guess) => ({
  type: MAKE_GUESS,
  guess });

export const INCREMENT_SCORE = 'INCREMENT_SCORE';
export const incrementScore = () => ({
  type: INCREMENT_SCORE });

export const INCREMENT_QUESTION = 'INCREMENT_QUESTION';
export const incrementQuestion = () => ({
  type: INCREMENT_QUESTION });

export const ENQUEUE = 'ENQUEUE';
export const enqueue = () => ({
  type: ENQUEUE });

export const DEQUEUE = 'DEQUEUE';
export const dequeue = () => ({
  type: DEQUEUE });

export const REQUEUE = 'REQUEUE';
export const requeue = () => ({
  type: REQUEUE });

export const FILL_UP_QUEUE = 'FILL_UP_QUEUE';
export const fillUpQueue = (array) => ({
  type: FILL_UP_QUEUE,
  array
});

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
