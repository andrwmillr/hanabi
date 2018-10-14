import React from 'react';
import socket from '../socket';
import Board from './Board';
import { setup } from '../utils/functions';

export default class GameScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      submittedName: false,
      players: [],
      startedGame: false,
    };
    this.socket = socket;
    this.inputName = this.inputName.bind(this);
    this.saveName = this.saveName.bind(this);
    this.startGame = this.startGame.bind(this);
    this.goHome = this.goHome.bind(this);
  }

  componentDidMount() {
    if (this.props.name) {
      this.setState({ name: this.props.name, submittedName: true });
    }

    this.socket.on('set-players', room => {
      this.setState({ players: room.players });
    });

    this.socket.on('start', room => {
      this.setState({
        startedGame: true,
        game: room.game,
        playing: room.playing,
      });
    });

    this.socket.emit('get-players');
  }

  componentWillUnmount() {
    this.socket.off('set-players');
    this.socket.off('start');
  }

  inputName(evt) {
    this.setState({ name: evt.target.value });
  }

  saveName(evt) {
    evt.preventDefault();
    this.socket.emit('send-name', this.state.name);
    this.props.saveName(this.state.name);
    this.setState({ submittedName: true });
  }

  startGame() {
    const game = setup();
    this.socket.emit('start', game);
  }

  goHome() {
    this.props.toggleGame();
  }

  render() {
    if (this.state.startedGame) {
      return (
        <div id="board" className="vert-flex">
          <Board
            game={this.state.game}
            playing={this.state.playing}
            players={this.state.players}
          />
        </div>
      );
    } else {
      return (
        <div id="game" className="vert-flex">
          {!this.state.submittedName ? (
            <div className="setup-item name-entry">
              <input
                className="name-input"
                type="text"
                placeholder="Your Name"
                onChange={this.inputName}
              />
              <button
                className="name-submit"
                type="button"
                onClick={this.saveName}
              >
                Save
              </button>
            </div>
          ) : (
            <div className="setup-item">
              <b>You:</b> {this.state.name}
            </div>
          )}
          <div className="setup-item">
            <b>Playing:</b>{' '}
            {this.state.players.map(player => player.name).join(', ')}
            <br />
            <small>(Use multiple tabs to play alone.)</small>
          </div>
          <div id="button-container" className="setup-item horiz-flex">
            <button className="button" type="button" onClick={this.startGame}>
              Start Game
            </button>
            <button className="button" type="button" onClick={this.goHome}>
              Go Home
            </button>
          </div>
        </div>
      );
    }
  }
}