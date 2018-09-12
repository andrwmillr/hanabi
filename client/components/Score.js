import React from 'react'
import Card from './Card'

const Score = props => (
  <div>
    <h3>Board </h3>
    <div className="hand">
      <div>
        <Card show={true} card={[props.board.R, 'R']} />
      </div>
      <div>
        <Card show={true} card={[props.board.B, 'B']} />
      </div>
      <div>
        <Card show={true} card={[props.board.G, 'G']} />
      </div>
      <div>
        <Card show={true} card={[props.board.Y, 'Y']} />
      </div>
      <div>
        <Card show={true} card={[props.board.W, 'W']} />
      </div>
    </div>
  </div>
)

export default Score
