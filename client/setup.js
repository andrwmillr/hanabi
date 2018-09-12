const R = 'R'
const B = 'B'
const G = 'G'
const Y = 'Y'
const W = 'W'

const R1 = [1, R]
const R2 = [2, R]
const R3 = [3, R]
const R4 = [4, R]
const R5 = [5, R]
const B1 = [1, B]
const B2 = [2, B]
const B3 = [3, B]
const B4 = [4, B]
const B5 = [5, B]
const G1 = [1, G]
const G2 = [2, G]
const G3 = [3, G]
const G4 = [4, G]
const G5 = [5, G]
const Y1 = [1, Y]
const Y2 = [2, Y]
const Y3 = [3, Y]
const Y4 = [4, Y]
const Y5 = [5, Y]
const W1 = [1, W]
const W2 = [2, W]
const W3 = [3, W]
const W4 = [4, W]
const W5 = [5, W]

export const cards = [
  R1,
  R1,
  R1,
  R2,
  R2,
  R3,
  R3,
  R4,
  R4,
  R5,
  B1,
  B1,
  B1,
  B2,
  B2,
  B3,
  B3,
  B4,
  B4,
  B5,
  G1,
  G1,
  G1,
  G2,
  G2,
  G3,
  G3,
  G4,
  G4,
  G5,
  Y1,
  Y1,
  Y1,
  Y2,
  Y2,
  Y3,
  Y3,
  Y4,
  Y4,
  Y5,
  W1,
  W1,
  W1,
  W2,
  W2,
  W3,
  W3,
  W4,
  W4,
  W5
]

export const draw = function(hand, deck, card) {
  const idx = hand.indexOf(card)
  hand.splice(idx, 1)
  if (deck.length) {
    const newCard = deck.shift()
    hand.push(newCard)
  }
  return {hand, deck}
}

export const hintToText = (idxArr, hintType) => {
  hintType = hintTypeToText(hintType)
  let copyArr = idxArr.map(idx => idx + 1)
  if (copyArr.length === 1) {
    return 'card ' + copyArr[0] + ' is a ' + hintType
  }
  const last = copyArr.pop()
  let returnStr = copyArr.join(', ')
  returnStr = 'cards ' + returnStr + ' and ' + last + ' are ' + hintType + 's'
  return returnStr
}

const hintTypeToText = type => {
  switch (type) {
    case 'G':
      return 'green'
    case 'R':
      return 'red'
    case 'B':
      return 'blue'
    case 'Y':
      return 'yellow'
    case 'W':
      return 'white'
    case '1':
      return 'one'
    case '2':
      return 'two'
    case '3':
      return 'three'
    case '4':
      return 'four'
    case '5':
      return 'five'
    default:
      return ''
  }
}
