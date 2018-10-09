import React from 'react';
import socket from '../socket';
import Board from './Board';
import { setup } from '../functions';

export default class Game extends React.Component {
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
  }

  componentDidMount() {
    this.socket.on('add-player', room => {
      this.setState({ players: room.players });
    });

    this.socket.on('start', room => {
      this.setState({
        startedGame: true,
        game: room.game,
        playing: room.playing,
      });
    });
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
    const game = setup();
    this.socket.emit('start', game);
  }

  render() {
    if (this.state.startedGame) {
      console.log(this.state.game);
      return (
        <div className="vert-flex">
          <Board
            game={this.state.game}
            playing={this.state.playing}
            players={this.state.players}
          />
        </div>
      );
    } else {
      return (
        <div className="vert-flex">
          {!this.state.submittedName ? (
            <div className="name-entry">
              <input
                className="name-input"
                type="text"
                placeholder="enter your name"
                onChange={this.inputName}
              />
              <button type="button" onClick={this.saveName}>
                Save
              </button>
            </div>
          ) : (
            <div className="setup-item">You: {this.state.name}</div>
          )}
          <div className="setup-item">
            Players:{' '}
            {!this.state.players.length ? (
              <div>No one yet...</div>
            ) : (
              this.state.players.map(player => player.name).join(', ')
            )}
          </div>
          <div className="setup-item">
            <button
              className="button -regular"
              type="button"
              onClick={this.startGame}
            >
              Start Game
            </button>
          </div>
          <div className="setup-item">
            (Open multiple tabs to demo the game by yourself.)
          </div>
        </div>
      );
    }
  }
}
