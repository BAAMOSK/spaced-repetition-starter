import React from 'react';
// import * as Cookies from 'js-cookie';
import { connect } from 'react-redux';
// import AnswerForm from '../answer-form/answer-form';
import Navbar from '../navbar/Navbar';
import { fetchQuestion, fetchQuestionIndex, makeGuess, incrementScore, incrementQuestion } from '../../actions';
import './question-page.css';

export class QuestionPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      queue: [],
      index: 0
    };
  }

  componentWillMount () {
    this.props.dispatch(fetchQuestion());
  }

  // componentWillReceiveProps (nextProps) {
  //   console.log('NEXTPROPS', nextProps);
  //   if (nextProps.questions.length) {
  //     nextProps.questions.forEach((question, index) => {
  //       this.state.queue.push(index, question);
  //     });
  //       // console.log('IN WILLRECEIVEPROPS', this.state.queue);
  //     return this.state.queue;
  //   }
  // }

  submitGuess (e) {
    e.preventDefault();
    // let status = 'Submit';
    // const questionsQueue = [];
    // for (let i = 0; i < this.props.questions.length; i++) {
    //   questionsQueue.push(this.props.questions[i]);
    // }
    // const correctQueue = [];
    const value = this.input.value;
      // this.form.reset();
    this.props.dispatch(makeGuess(value));
    this.input.value = '';
    // this.props.dispatch(fetchQuestionIndex());
    // const question = this.props.questions[this.props.questionIndex];
    let question = this.props.questions[0];
    // console.log('APPSTATE QINDEX', this.props.questionIndex);
    // console.log('VALUE', value);
    // console.log('QUESTION.ANSWER', question.answer);
    this.setState({ index: this.state.index + 1 });
    // console.log('INDEX', this.state.index);
    // let displayQuestion = questions[0];

    // if (this.props.queueA.length === 9) {
      // questions.push(...this.props.queueA);
      // question = this.props.queueA[0].answer;
    // }
    // console.log('This is always the answer:', displayQuestion);
    if (value === question.answer) {
        //increment score
      this.props.dispatch(incrementScore());
      this.props.dispatch(incrementQuestion());
      console.log('This is the question:', question);
      const correctlyAnswered = this.props.questions.shift();
      this.props.queueA.push(correctlyAnswered);
        //dequeue
        // const currentQuestion = questionsQueue.shift();
        // console.log('**********', questionsQueue);
        // console.log('__________', correctQueue);
        // correctQueue.push(currentQuestion);
        // this.props.dispatch(dequeue());
        //requeue
        // this.props.dispatch(requeue());
      alert('Correct!');
    } else {
        //dequeue
        //enqueue same question
      const wrongQuestion = this.props.questions.shift();
      this.props.questions.push(wrongQuestion);
      alert('Sorry, try again later!');
    }
    status = 'Next';
    console.log('APPSTATE QUESTIONS', this.props.questions);
  }
//STARTING WITH QUESTIONS QUEUE WHICH IS COPY OF QUESTIONS ARRAY IN APPSTATE
//IF IT'S RIGHT, WE MOVE QUESTION TO CORRECTQUEUE
//IF IT'S WRONG, WE MOVE QUESTION TO BACK OF QUESTIONSQUEUE
//WHEN WE GO THROUGH LENGTH OF QUESTIONS ARRAY IN APPSTATE, THEN WE START QUESTIONSQUEUE
//WHEN QUESTIONSQUEUE IS DONE, WE GO TO CORRECTQUEUE
  render () {
    let displayQuestion = [];
    let questions = this.props.questions.map((val, index) => {
      // return this.props.dispatch(fillUpQueue(val.question));
      displayQuestion.push(val);
      // return displayQuestion;
      return (<li key={index}>{val.question}</li>);
    });
    // displayQuestion = questions[0]
    console.log('This is the display --------', displayQuestion);
    console.log('This is the questions ------', questions);
    // let displayQuestion = questions[0];
    if (this.props.questions.length === 1) {
      console.log('The end was reached!!!');
      displayQuestion = 'ERZA';
      // displayQuestion = ;
      // displayQuestion = this.props.queueA[0].question;
      // this.props.queueA.forEach(item => {
      //   questions.push(item);
      // });
      // questions.push(this.props.queueA);
      // displayQuestion = questions[0];
    }
    let status = 'Submit';
    // console.log('THIS IS THE STATE QUEUE', this.state.queue);
    return (
          <div>
        {/*<button onClick={this.bind.populateQuestions(this)} />*/}
            <Navbar />
             {/*<ul className="question-list">*/}
              {/*<li>{this.props.questions[0].question}</li>*/}
            {/* {questions[this.state.index]} */}
            <h1 className="question">{questions[0]}</h1>
            {}
          {/* {this.props.questions[fetchQuestionIndex()].question} */}
          {/* {this.state.queue[this.props.questionIndex].question} */}
           {/* </ul> */}
            <form onSubmit={e => this.submitGuess(e)}>
              <input type="text" name="userGuess" id="userGuess" autoComplete="off"
                  className="text" placeholder="The meaning is..." required
                  ref={input => this.input = input} />
              <button type="submit" >{status}</button>
            </form>
          </div>
    );
  }
}

const mapStateToProps = (state) => ({
  guesses: state.guesses,
  questions: state.questions,
  score: state.score,
  queueA: state.queueA,
  queueB: state.queueB,
  questionIndex: state.questionIndex,
  questionCount: state.questionCount
});

export default connect(mapStateToProps)(QuestionPage);
