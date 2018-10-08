import React from 'react';
import socket from '../socket';
import Board from './Board';

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      submittedName: false,
      startedGame: false,
    };
    this.socket = socket;
    this.inputName = this.inputName.bind(this);
    this.saveName = this.saveName.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  inputName(evt) {
    this.setState({ name: evt.target.value });
  }

  saveName(evt) {
    evt.preventDefault();
    this.socket.emit('send-name', this.state.name);
    this.setState({ submittedName: true });
  }

  startGame() {
    this.setState({ startedGame: true });
  }

  render() {
    if (this.state.startedGame) {
      return (
        <div>
          <Board />
        </div>
      );
    } else {
      return (
        <div>
          Name entry and such<button type="button" onClick={this.startGame}>
            Start
          </button>
        </div>
      );
    }
  }
}
