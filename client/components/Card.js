import React from 'react'

const Card = props => {
  let number
  let color
  let style
  if (!props.show) {
    color = 'grey'
    number = '?'
    style = {backgroundColor: 'grey', color: 'grey'}
  } else {
    number = props.card[0]
    if (props.card[1] === 'grey') color = 'grey'
    if (props.card[1] === 'R') color = 'red'
    if (props.card[1] === 'Y') color = 'yellow'
    if (props.card[1] === 'B') color = 'blue'
    if (props.card[1] === 'W') color = 'white'
    if (props.card[1] === 'G') color = 'green'
    style = {backgroundColor: `${color}`}
  }

  return (
    <div id={[props.player, props.card]} className="card" style={style}>
      <div value={props.card[0]} className="number">
        {number}
      </div>
    </div>
  )
}

export default Card
