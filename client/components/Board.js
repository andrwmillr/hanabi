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
      playing: '',
      name: '',
      submittedName: false
    }
    this.socket = socket
    this.startGame = this.startGame.bind(this)
    this.endTurn = this.endTurn.bind(this)
    this.inputName = this.inputName.bind(this)
    this.saveName = this.saveName.bind(this)
  }

  componentDidMount() {
    this.socket.on('add-player', players => {
      console.log('players', players)
      this.setState({players})
    })

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
  }

  startGame() {
    const game = setup()
    this.socket.emit('start', game)
  }

  endTurn(game) {
    this.socket.emit('turn', game)
  }

  inputName(evt) {
    this.setState({name: evt.target.value})
  }

  saveName(evt) {
    evt.preventDefault()
    this.socket.emit('send-name', this.state.name)
    this.setState({submittedName: true})
  }

  render() {
    const G = this.state.game
    const players = this.state.players
    return (
      <div style={{padding: 20}}>
        {/* conditionally render depending on whether game has started */}
        {G.hands ? (
          // game HAS started
          <div>
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
            </div>
            <div className="options">
              <div className="option">Cards in deck: {G.deck.length}</div>

              <div className="option">Discard: {displayDiscard(G.discard)}</div>
            </div>
          </div>
        ) : (
          // game HAS NOT started
          <div>
            Play Hanabi in your browser.
            <ul>
              <li>
                Learn the rules{' '}
                <a
                  href="https://en.wikipedia.org/wiki/Hanabi_(card_game)#Gameplay"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  here
                </a>.
              </li>
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
              {players.map(player => <li key={player.id}>{player.name}</li>)}
            </ul>
            <p>
              <button type="button" onClick={this.startGame}>
                Start Game
              </button>
            </p>
          </div>
        )}
      </div>
    )
  }
}

function displayDiscard(discardArr) {
  let discardObj = {R: [], B: [], G: [], Y: [], W: []}
  for (let card of discardArr) {
    let number = card[0]
    let color = card[1]
    discardObj[color].push(number)
  }
  let dispArr = []
  for (let color of Object.keys(discardObj)) {
    discardObj[color].sort((a, b) => a - b)
    let numStr = discardObj[color].join(', ')
    dispArr.push([color, numStr])
  }
  return (
    <div className="discard">
      {dispArr.map(el => {
        let [color, numStr] = [el[0], el[1]]
        return <div key={color}>{color + ' - ' + numStr}</div>
      })}
    </div>
  )
}

// this.socket.on('save-name', data => {
//   console.log('setting state clientName', data)
//   this.setState({
//     players: data.room.players,
//     clientName: data.name
//   })
// })

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
