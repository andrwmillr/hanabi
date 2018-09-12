import React from 'react'
import Card from './Card'
import Hint from './Hint'

export default class Hand extends React.Component {
  constructor() {
    super()
    this.state = {selected: null}
    this.play = this.play.bind(this)
    this.discard = this.discard.bind(this)
    this.giveHint = this.giveHint.bind(this)
    this.selectCard = this.selectCard.bind(this)
  }

  play(evt) {
    evt.preventDefault()
    const player = this.props.player
    const card = this.state.selected
    const newG = this.props.moves.play(this.props.G, player, card)
    const domSelected = document.getElementsByClassName('selected')
    if (domSelected.length) {
      domSelected[0].classList.remove('selected')
    }
    this.props.endTurn(newG)
  }

  discard(evt) {
    evt.preventDefault()
    const player = this.props.player
    const card = this.state.selected
    const newG = this.props.moves.discard(this.props.G, player, card)
    const domSelected = document.getElementsByClassName('selected')
    if (domSelected.length) {
      domSelected[0].classList.remove('selected')
    }
    this.props.endTurn(newG)
  }

  giveHint(evt, hint) {
    evt.preventDefault()
    const player = this.props.player
    let newG
    if (this.props.AI) {
      newG = this.props.moves.giveHintAI(player, hint, this.props.G)
    } else {
      newG = this.props.moves.giveHint(player, hint, this.props.G)
    }
    if (newG.hint === 'There are no information tokens left!') {
      alert(newG.hint)
    } else {
      const domSelected = document.getElementsByClassName('selected')
      if (domSelected.length) {
        domSelected[0].classList.remove('selected')
      }
      this.props.endTurn(newG)
    }
  }

  selectCard(card) {
    const domCard = document.getElementById([this.props.player, card])
    const domSelected = document.getElementsByClassName('selected')
    if (domSelected.length) {
      domSelected[0].classList.remove('selected')
    }
    domCard.classList.add('selected')
    this.setState({selected: card})
  }

  render() {
    const player = this.props.player
    const client = this.props.client
    const yourHand = player === client
    const isPlaying = this.props.playing === client
    const keysForCards = makeKeys(this.props.hand)
    return (
      <div>
        {yourHand ? (
          <h3>Your Hand {isPlaying && <h5>(it's your turn!)</h5>}</h3>
        ) : (
          <h3>{player}'s Hand</h3>
        )}
        <div className="hand">
          {yourHand
            ? this.props.hand.map((card, index) => {
                const key = keysForCards[index]
                return (
                  <div key={key} onClick={() => this.selectCard(card)}>
                    <Card key={key} show={false} card={card} player={player} />
                  </div>
                )
              })
            : this.props.hand.map((card, index) => {
                return (
                  <div key={keysForCards[index]}>
                    <Card show={true} card={card} player={player} />
                  </div>
                )
              })}
        </div>

        {isPlaying && (
          <div>
            {yourHand ? (
              <div className="options">
                <div className="option">
                  <button type="button" onClick={this.play}>
                    Play
                  </button>
                </div>
                <div className="option">
                  <button type="button" onClick={this.discard}>
                    Discard
                  </button>
                </div>
              </div>
            ) : (
              <div className="options">
                <div className="option">
                  <Hint
                    player={player}
                    hand={this.props.hand}
                    giveHint={this.giveHint}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}

function makeKeys(hand) {
  const checkerObj = {}
  const keys = []
  for (let card of hand) {
    let existing = checkerObj[card]
    if (existing) {
      keys.push(card + existing)
      checkerObj[card]++
    } else {
      keys.push(card)
      checkerObj[card] = 1
    }
  }
  return keys
}
