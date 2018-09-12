import React from 'react'
import Hand from './Hand'
import Score from './Score'
import {setup, moves, calcPoints} from '../functions'
import socket from '../socket'

export default class Board extends React.Component {
  constructor() {
    super()
    this.state = {
      players: [],
      game: {},
      playing: ''
    }
    this.socket = socket
    this.startGame = this.startGame.bind(this)
    this.endTurn = this.endTurn.bind(this)
  }

  componentDidMount() {
    this.socket.on('start', room => {
      this.setState({
        players: room.players,
        game: room.game,
        playing: room.playing
      })
    })

    this.socket.on('turn', room => {
      this.setState({
        players: room.players,
        game: room.game,
        playing: room.playing
      })
      if (!room.game.deck.length) {
        alert(
          `No more cards in the deck. You have ${
            room.turnsLeft
          } turns remaining.`
        )
      }
    })

    this.socket.on('game-over', game => {
      console.log('game over!')
      alert(`Game over! You got ${calcPoints(game.board)} points!`)
    })

    // this.socket.on('save-name', data => {
    //   console.log('setting state clientName', data)
    //   this.setState({
    //     players: data.room.players,
    //     clientName: data.name
    //   })
    // })
  }

  startGame() {
    const game = setup()
    this.socket.emit('start', game)
  }

  endTurn(game) {
    this.socket.emit('turn', game)
  }

  // startGameWithAI() {
  //   const game = setup()
  //   const players = [this.socket.id, 'Ava', 'Beta', 'Otis']
  //   let hands = {}
  //   for (let player of players) {
  //     hands[player] = []
  //     let i = 0
  //     while (i < 5) {
  //       const card = game.deck.shift()
  //       hands[player].push(card)
  //       i++
  //     }
  //   }
  //   game.hands = hands
  //   let counter = 0
  //   const playing = players[counter]
  //   this.setState({game, players, playing, AI: true})
  // }

  // AIPlay(game, turn) {
  //   let playing
  //   if (turn === 2) {
  //     playing = 0
  //   } else {
  //     playing = turn + 1
  //   }
  //   this.setState(prevState => ({game, playing: prevState.players[playing]}))
  // }

  render() {
    const G = this.state.game
    const players = this.state.players
    return (
      <div style={{padding: 20}}>
        {G.hands ? (
          <div>
            {players.map(player => (
              <Hand
                key={player}
                player={player}
                hand={G.hands[player]}
                client={this.socket.id}
                playing={this.state.playing}
                moves={moves}
                G={this.state.game}
                endTurn={this.endTurn}
              />
            ))}
            <div>
              <Score board={G.board} />
            </div>
            <div className="options">
              <div className="option">Information tokens: {G.information}</div>
              <div className="option">Fuse: {G.fuse}</div>
              {G.hint.length ? (
                <div className="option">Hint: {G.hint}</div>
              ) : (
                <div className="option">Hint: none</div>
              )}
              <div className="option">
                Discard:{' '}
                {G.discard.length ? (
                  G.discard.map(card => <div key={card}>{' ' + card},</div>)
                ) : (
                  <div> none</div>
                )}
              </div>
              <div className="option">Cards in deck: {G.deck.length}</div>
            </div>
          </div>
        ) : (
          <div>
            <button type="button" onClick={this.startGame}>
              Start Game
            </button>{' '}
            -- To create your own room, enter a custom url.
          </div>
        )}
      </div>
    )
  }
}
