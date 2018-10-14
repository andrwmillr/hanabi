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
      rooms: [],
      room: '',
      enteredRoom: false,
      players: [],
      startedGame: false,
    };
    this.socket = socket;
    this.inputName = this.inputName.bind(this);
    this.inputRoom = this.inputRoom.bind(this);
    this.saveName = this.saveName.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.startGame = this.startGame.bind(this);
    this.goHome = this.goHome.bind(this);
  }

  componentDidMount() {
    // check if name/room has already been saved
    if (this.props.room) {
      this.setState({ room: this.props.room, enteredRoom: true });
    }

    if (this.props.name) {
      this.setState({ name: this.props.name, submittedName: true });
    }

    // set up socket listeners
    this.socket.on('send-rooms', rooms => {
      this.setState({ rooms });
    });

    this.socket.on('send-players', players => {
      this.setState({ players });
    });

    this.socket.on('add-player', players => {
      console.log('adding...');
      this.setState({ players: players });
    });

    this.socket.on('start', room => {
      this.setState({
        startedGame: true,
        game: room.game,
        playing: room.playing,
      });
    });

    // get room that player has joined, or get list of all rooms
    if (this.props.room) {
      this.socket.emit('get-players', this.props.room);
    } else {
      this.socket.emit('get-rooms');
    }
  }

  componentWillUnmount() {
    this.socket.off('set-rooms');
    this.socket.off('set-room');
    this.socket.off('add-player');
    this.socket.off('start');
  }

  inputName(evt) {
    this.setState({ name: evt.target.value });
  }

  inputRoom(evt) {
    this.setState({ room: evt.target.value });
  }

  saveName(evt) {
    evt.preventDefault();
    this.socket.emit('send-name', {
      name: this.state.name,
      room: this.state.room,
    });
    this.props.saveName(this.state.name);
    this.setState({ submittedName: true });
  }

  joinRoom(evt) {
    evt.preventDefault();
    this.socket.emit('join-room', this.state.room);
    this.props.saveRoom(this.state.room);
    this.setState({ enteredRoom: true });
  }

  createRoom(evt) {
    evt.preventDefault();
    this.socket.emit('create-room', this.state.room);
    this.props.saveRoom(this.state.room);
    this.setState({ enteredRoom: true });
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
    }

    return (
      <div id="game" className="vert-flex">
        {this.state.enteredRoom ? (
          <div className="setup-item">
            {this.state.submittedName ? (
              <div className="setup-item">
                <b>You:</b> {this.state.name}
              </div>
            ) : (
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
            )}
            <b>Room:</b> {this.state.room}
            <br />
            <b>Playing:</b>{' '}
            {this.state.players.map(player => player.name).join(', ')}
            <br />
            <small>(Use multiple tabs to play alone.)</small>
            <button className="button" type="button" onClick={this.startGame}>
              Start Game
            </button>
          </div>
        ) : (
          <div className="setup-item">
            {' '}
            <div className="horiz-flex">
              <div>
                <input
                  className="name-input"
                  type="text"
                  placeholder="Create a Game"
                  onChange={this.inputRoom}
                />
                <button
                  className="name-submit"
                  type="button"
                  onClick={this.createRoom}
                >
                  Create
                </button>
              </div>
              <div>
                <form
                  onSubmit={evt => this.joinRoom(evt)}
                  style={{ display: 'flex' }}
                >
                  <div className="hint-menu">
                    <select onChange={evt => this.inputRoom(evt)}>
                      <option>Join a Game</option>
                      {this.state.rooms.map(room => {
                        return <option key={room}>{room}</option>;
                      })}
                    </select>
                  </div>
                  <button className="hint-submit" type="submit">
                    Join
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
        <button className="button" type="button" onClick={this.goHome}>
          Go Home
        </button>
      </div>
    );
  }
}
