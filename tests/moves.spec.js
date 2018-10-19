import { expect } from 'chai';

import { setup, deal, moves } from '../client/utils/functions';

describe('moves', () => {
  let game, discardCard, playCard, hint;
  let players = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];

  beforeEach(() => {
    const deck = setup();
    game = deal(deck, players);
  });

  describe('discard function', () => {
    beforeEach(() => {
      discardCard = game.hands['1'][0];
    });

    it('returns a game object', () => {
      const newG = moves.discard(game, players[0], discardCard);
      expect(newG).to.be.an.instanceOf(Object);
    });

    it('increases information by 1', () => {
      game.information = 6;
      const newG = moves.discard(game, players[0], discardCard);
      expect(newG.information).to.equal(7);
    });

    it('does not increase information if information = 8', () => {
      game.information = 8;
      const newG = moves.discard(game, players[0], discardCard);
      expect(newG.information).to.equal(8);
    });

    it('adds to the discard array', () => {
      const newG = moves.discard(game, players[0], discardCard);
      expect(newG.discard[0]).to.equal(discardCard);
    });

    it('replaces the discarded card in the correct position', () => {
      const newG = moves.discard(game, players[0], discardCard);
      const oldHand = game.hands['1'];
      const newHand = newG.hands['1'];
      expect(newHand[1]).to.equal(oldHand[1]);
      expect(newHand[2]).to.equal(oldHand[2]);
      expect(newHand[3]).to.equal(oldHand[3]);
      expect(newHand[4]).to.equal(oldHand[4]);
    });
  });

  describe('play function', () => {
    it('returns a game object', () => {
      const newG = moves.play(game, players[0], game.hands['1'][0]);
      expect(newG).to.be.an.instanceOf(Object);
    });

    it('can successfully play a 1', () => {
      game.hands['1'][0] = [1, 'R'];
      playCard = game.hands['1'][0];
      const newG = moves.play(game, players[0], playCard);
      expect(newG.board.R).to.equal(1);
    });
  });
});
