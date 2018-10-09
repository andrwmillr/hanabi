import React from 'react';
import Hand from './Hand';
import Score from './Score';
import { moves, calcPoints, displayDiscard } from '../functions';
import socket from '../socket';

export default class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      game: {},
      players: [],
      playing: '',
    };
    this.socket = socket;
    this.endTurn = this.endTurn.bind(this);
  }

  componentDidMount() {
    this.setState({
      game: this.props.game,
      playing: this.props.playing,
      players: this.props.players,
    });

    this.socket.on('turn', room => {
      this.setState({
        players: room.players,
        game: room.game,
        playing: room.playing,
      });
      if (!room.game.deck.length) {
        alert(
          `No more cards in the deck. You have ${
            room.turnsLeft
          } turns remaining.`
        );
      }
    });

    this.socket.on('game-over', game => {
      alert(`Game over! You got ${calcPoints(game.board)} points!`);
    });
  }

  endTurn(game) {
    this.socket.emit('turn', game);
  }

  render() {
    const G = this.state.game;
    const players = this.state.players;
    return !G.hands ? (
      <div>Loading...</div>
    ) : (
      <div className="board">
        {players.map(player => (
          <Hand
            key={player.id}
            player={player}
            hand={G.hands[player.id]}
            client={this.socket.id}
            playing={this.state.playing}
            moves={moves}
            G={this.state.game}
            endTurn={this.endTurn}
          />
        ))}
        <Score board={G.board} />
        <div className="game-info">
          <div className="options">
            <div className="option">Information / {G.information}</div>
            <div className="option">Fuse / {G.fuse}</div>
            <div className="option">Deck / {G.deck.length}</div>
          </div>
          <div className="options">
            <div className="option">Hint / {G.hint}</div>
          </div>
          <div className="options">
            <div className="option" style={{ width: '100%' }}>
              Discard {displayDiscard(G.discard)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
