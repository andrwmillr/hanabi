import { cards, draw, hintToText } from './setup';
import shuffle from 'shuffle-array';
import React from 'react';

export const setup = () => {
  let deck = shuffle(cards);
  return {
    board: {
      R: 0,
      Y: 0,
      B: 0,
      G: 0,
      W: 0,
    },
    information: 8,
    fuse: 3,
    hint: '',
    deck,
    discard: [],
  };
};

export const moves = {
  play(G, player, card) {
    const newG = { ...G };
    card = newG.hands[player.id].find(selected => selected === card);
    const value = card[0];
    const color = card[1];
    if (newG.board[color] === value - 1) {
      newG.board[color] = value;
      const newHandAndDeck = draw(newG.hands[player.id], newG.deck, card);
      newG.hands[player.id] = newHandAndDeck.hand;
      const deck = newHandAndDeck.deck;
      return { ...newG, deck };
    } else {
      const fuse = newG.fuse - 1;
      const newHandAndDeck = draw(newG.hands[player.id], newG.deck, card);
      newG.hands[player.id] = newHandAndDeck.hand;
      newG.discard.push(card);
      const deck = newHandAndDeck.deck;
      return { ...newG, deck, fuse };
    }
  },

  discard(G, player, card) {
    const newG = { ...G };
    let information = newG.information;
    if (information < 8) {
      information++;
    }
    const newHandAndDeck = draw(newG.hands[player.id], newG.deck, card);
    newG.hands[player.id] = newHandAndDeck.hand;
    newG.discard.push(card);
    const deck = newHandAndDeck.deck;
    return { ...newG, deck, information };
  },

  giveHint(player, hint, G) {
    let information = G.information;
    let newHint;
    if (information === 0) {
      newHint = 'There are no information tokens left!';
    } else {
      newHint = G.hint;
      const hintText = hintToText(hint[1], hint[0]);
      information--;
      newHint = `${player.name}: ${hintText}`;
    }
    return { ...G, hint: newHint, information };
  },
};

export const calcPoints = board => {
  let points = 0;
  for (let color in board) {
    if (board.hasOwnProperty(color)) points = points + board[color];
  }
  return points;
};

export const displayDiscard = discardArr => {
  let discardObj = { R: [], B: [], G: [], Y: [], W: [] };
  for (let card of discardArr) {
    let number = card[0];
    let color = card[1];
    discardObj[color].push(number);
  }
  let dispArr = [];
  for (let color of Object.keys(discardObj)) {
    discardObj[color].sort((a, b) => a - b);
    let numStr = discardObj[color].join(', ');
    dispArr.push([color, numStr]);
  }
  return (
    <div className="discard">
      {dispArr.map(el => {
        let [color, numStr] = [el[0], el[1]];
        return <div key={color}>{color + ' - ' + numStr}</div>;
      })}
    </div>
  );
};
