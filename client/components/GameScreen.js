import React from 'react';
import socket from '../socket';

import Board from './Board';
import NameEntry from './NameEntry';
import JoinGame from './JoinGame';

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
    this.socket.emit('send-name', this.state.name);
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

    if (this.state.enteredRoom) {
      if (this.state.submittedName) {
        return (
          <div id="game" className="vert-flex">
            <div className="setup-item">
              <b>You:</b> {this.state.name}
            </div>
            <div className="setup-item">
              <b>Room:</b> {this.state.room}
            </div>
            <div className="setup-item">
              <b>Players:</b>{' '}
              {this.state.players.map(player => player.name).join(', ')}
              <br />
              {this.state.players.length < 2 && (
                <small>(Use multiple tabs to play alone.)</small>
              )}
            </div>
            <div id="button-container">
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
      if (!this.state.submittedName) {
        return (
          <div id="game" className="vert-flex">
            <div className="setup-item">
              <NameEntry inputName={this.inputName} saveName={this.saveName} />
            </div>
            <div className="setup-item">
              <b>Room:</b> {this.state.room}
            </div>
            <div className="setup-item">
              <b>Players:</b>{' '}
              {this.state.players.map(player => player.name).join(', ')}
              <br />
              {this.state.players.length < 2 && (
                <small>(Use multiple tabs to play alone.)</small>
              )}
            </div>
            <div id="button-container">
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

    if (!this.state.enteredRoom) {
      return (
        <div id="game" className="vert-flex">
          <div className="setup-item" style={{ width: '85%' }}>
            {' '}
            <JoinGame
              inputRoom={this.inputRoom}
              joinRoom={this.joinRoom}
              createRoom={this.createRoom}
              rooms={this.state.rooms}
            />
          </div>
          <button className="button" type="button" onClick={this.goHome}>
            Go Home
          </button>
        </div>
      );
    }
  }
}
