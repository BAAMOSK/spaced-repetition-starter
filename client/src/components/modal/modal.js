import React from 'react';
// import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

export default class popup extends React.Component {
  constructor () {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal () {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal () {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#000';
  }

  closeModal () {
    this.setState({ modalIsOpen: false });
  }

  render () {
    return (
      <div>
        <button className={'btn btn-success submit'} onClick={this.openModal}>Submit</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>{this.props.status}</h2>
          <div className={'center'}>{this.props.answer}</div>
          <form>
          <button onKeyPress={this.closeModal} onClick={this.closeModal}>{'Next'}</button>
          </form>
        </Modal>
      </div>
    );
  }
}

