import {
  FETCH_QUESTION_REQUEST,
  FETCH_QUESTION_SUCCESS,
  FETCH_QUESTION_FAILURE,
  //FETCH_SCORE,
  FETCH_QUESTION_INDEX,
  CREATE_USER,
  MAKE_GUESS,
  INCREMENT_SCORE,
  INCREMENT_QUESTION,
  // DEQUEUE,
  // REQUEUE,
  // ENQUEUE,
  FILL_UP_QUEUE
} from '../actions';
// import Queue from './algorithm';

const initialState = {
  questions: [],
  currentUser: null,
  loading: false,
  error: null,
  queueA: [],
  queueB: [],
  questionCount: 1,
  questionIndex: 0,
  guesses: [],
  score: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_QUESTION_REQUEST:
    return {
      ...state,
      loading: true
    };
  case FETCH_QUESTION_FAILURE:
    return Object.assign({}, state, {
      loading: false,
      error: true
    });
  case FETCH_QUESTION_SUCCESS:
    return Object.assign({}, state, {
      loading: false,
      error: null,
      questions: action.questions
    });
  // case FETCH_QUESTION_SUCCESS:
  //   let q = [];
  //   let a = [];
  //   for (let i=0; i<action.questions.length; i++) {
  //     q.push(action.questions[i].question);
  //     a.push(action.questions[i].answer);
  //   }
  //   return Object.assign({}, state, {
  //     loading: false,
  //     error: null,
  //     questions: q,
  //     answers: a
  //   });
  case CREATE_USER:
    return {
      ...state,
      currentUser: action.currentUser
    };

//   case FETCH_SCORE:
//     return {
//       ...state,
//       currentScore: action.currentScore
//     };
//   case FETCH_QUESTION_NUMBER:
//     return {
//       ...state,
//       questionNumber: action.questionNumber

  case MAKE_GUESS:
    return {
      ...state,
      guesses: state.guesses.concat(action.guess)
    };
  case INCREMENT_SCORE:
    return {
      ...state,
      score: state.score + 1
    };
  case INCREMENT_QUESTION:
    return {
      ...state,
      questionCount: state.questionCount + 1
    };
  case FETCH_QUESTION_INDEX:
    return {
      ...state,
      questionIndex: state.questionIndex + 1
    };
  // case DEQUEUE:
  //   return {
  //     ...state,
  //     queueA: Queue.queueA.dequeue()
  //   };
  // case REQUEUE:
  //   return {
  //     ...state,
  //     queueB: Queue.queueB
  //   };
  // case ENQUEUE:
  //   return {
  //     ...state,
  //     queueA: Queue.queueA.enqueue(state.questions[state.questionIndex])
  //   };
  case FILL_UP_QUEUE:
    return [
      ...state, {
        questions: action.array
      }
    ];
  default:
    return state;
  }
};

export default reducer;
