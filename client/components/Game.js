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
        <div>
          <Board
            game={this.state.game}
            playing={this.state.playing}
            players={this.state.players}
          />
        </div>
      );
    } else {
      return (
        <div style={{ padding: 20 }}>
          Play Hanabi in your browser.
          <ul>
            <li>To create a "private" room, enter a custom url.</li>
            <li>Open multiple tabs to demo the game by yourself.</li>
            <li>Start your game once all players have joined.</li>
            <li>
              The code for this project is{' '}
              <a
                href="https://github.com/andrwmillr/hanabi"
                rel="noopener noreferrer"
                target="_blank"
              >
                here
              </a>.
            </li>
          </ul>
          {!this.state.submittedName ? (
            <div>
              <form type="submit">
                <label>Enter your name:</label>
                <input type="text" onChange={this.inputName} />
              </form>
              <button type="submit" onClick={this.saveName}>
                Save Name
              </button>
            </div>
          ) : (
            <div>You: {this.state.name}</div>
          )}
          Players:
          <ul>
            {this.state.players.map(player => (
              <li key={player.id}>{player.name}</li>
            ))}
          </ul>
          <p>
            <button type="button" onClick={this.startGame}>
              Start Game
            </button>
          </p>
        </div>
      );
    }
  }
}
