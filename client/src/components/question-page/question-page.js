import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../navbar/Navbar';
import { fetchQuestion, fillUpQueue, makeGuess, incrementScore, incrementQuestion } from '../../actions';
import './question-page.css';
import Modal from '../modal/modal';

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

  componentWillReceiveProps (nextProps) {
    // let answer = 'Correct!';
    if (!nextProps.questions.length) {
      this.props.queueA.forEach(item => {
        this.props.questions.push(item);
      });
      return this.props.questions;
    }
  }

  submitGuess (e) {
    e.preventDefault();
    const correctQueue = [];
    const value = this.input.value;
    this.props.dispatch(makeGuess(value));
    this.input.value = '';

    let question = this.props.questions[0];

    this.setState({ index: this.state.index + 1 });
    if (this.props.questions.length === 0) {
      this.props.dispatch(fillUpQueue(correctQueue));
    }
    if (value.toLowerCase() === question.answer.toLowerCase()) {
      this.props.dispatch(incrementScore());
      this.props.dispatch(incrementQuestion());
      const correctlyAnswered = this.props.questions.shift();
      correctQueue.push(correctlyAnswered);
      this.props.queueA.push(correctlyAnswered);
      // alert('Correct!');
    } else {
      this.message = 'Sorry, try again later!';
      this.props.dispatch(incrementQuestion());
      const wrongQuestion = this.props.questions.shift();
      this.props.questions.push(wrongQuestion);
      // alert('Sorry, try again later!');
    }
  }
  render () {
    let questions = this.props.questions.map((val, index) => {
      return (<li key={index}>{val.question}</li>);
    });
    let message = 'Correct!';
    return (
          <div className={'center col-md-12'}>
            <Navbar className={'col-md-12'}/>
            <h1 className={'question'}>{questions[0]}</h1>
            <form onSubmit={e => this.submitGuess(e)}>
              <div className={'row'}><input type="text" name="userGuess" id="userGuess" autoComplete="off"
                  className={'text col-md-offset-2 col-md-8'} placeholder="The meaning is..." required
                  ref={input => this.input = input} /></div>
              <Modal className={'col-md-4'} status={message} answer={'answer'}/>
              {/*<button type="submit" >{status}</button>*/}
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
