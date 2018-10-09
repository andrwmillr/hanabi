import React from 'react';

const Walkthrough = props => {
  return (
    <div id="walkthrough" className="vert-flex">
      <div id="walkthrough-content" className="vert-flex">
        <div className="walkthrough-div">
          <p className="walkthrough-text">
            Hanabi is an award-winning <b>cooperative card game</b>, designed by
            Antoine Bauza and published in 2010.
          </p>
          <p className="walkthrough-text" style={{ margin: '0' }}>
            <b>"Hanabi" is the Japanese word for firework</b>. The game's
            premise is that players are trying to produce the most impressive
            fireworks show they can.
          </p>
        </div>
        <div className="walkthrough-div">
          <p className="walkthrough-text">
            To begin, <b>each player is dealt five cards</b>. <br /> You{' '}
            <b>cannot to see you own hand</b>, but you can see other players'
            hands.
          </p>
          <p className="walkthrough-text">
            During your turn, you have three options. <br /> You can{' '}
            <b>play a card, discard a card,</b> or{' '}
            <b>give a hint to another player.</b>
          </p>
          <p className="walkthrough-text" style={{ margin: '0' }}>
            Your goal is to <b>stack consecutive cards of the same color</b> -
            like solitare. <br />Let's watch a few turns.
          </p>
        </div>
        <br />
        <div className="walkthrough-div">
          <p className="walkthrough-text">
            Here, Ava doesn't know what's in her hand, so{' '}
            <b>Ava gives Hal a hint.</b> <br /> All hints must take a specific
            form: Ava must <b>identify all cards of a given color or value</b>{' '}
            in Hal's hand.
          </p>
          <video
            className="walkthrough-clip"
            src="./hanabi-clip-1.mp4"
            controls
          />
        </div>
        <br />
        <div className="walkthrough-div">
          <p className="walkthrough-text">
            Now it's Hal's turn. Ava's hint is visible at the bottom of his
            screen. <br />
            <b>Hal knows that he can play a one, so he does.</b> <br />You can
            see that a white one appears on the board.
          </p>
          <video
            className="walkthrough-clip"
            src="./hanabi-clip-2.mp4"
            controls
          />
        </div>
        <br />
        <div className="walkthrough-div">
          <p className="walkthrough-text">
            Here, Hal knows he has a couple of twos, but he doesn't know their
            color.<br />
            He tries to play a red two - but{' '}
            <b>playing a red two is illegal,</b> <br />since{' '}
            <b>
              a red one hasn't been played yet.<br />
            </b>The game's <b>fuse</b> decreases by one, and the red two is{' '}
            <b>discarded.</b>
          </p>
          <video
            className="walkthrough-clip"
            src="./hanabi-clip-3.mp4"
            controls
          />
        </div>
        <br />
        <div className="walkthrough-div">
          <p className="walkthrough-text">
            Every time a hint is given, an <b>information token</b> is used.
            Players can <b>discard to recover information tokens.</b> Watch the
            number of tokens available increase from 6 to 7.
          </p>
          <video
            className="walkthrough-clip"
            src="./hanabi-clip-4.mp4"
            controls
          />
        </div>
        <div className="walkthrough-div">
          <p className="walkthrough-text" style={{ margin: '0' }}>
            The game ends when your{' '}
            <b>fuse hits zero or you successfully play five of each color.</b>{' '}
            Your score is the number of cards successfully played.
          </p>
        </div>
      </div>

      <button
        id="end-walkthrough-button"
        className="button"
        type="button"
        onClick={props.toggleWalkthrough}
        style={{ margin: '0 0 2.5% 0' }}
      >
        Home
      </button>
    </div>
  );
};

export default Walkthrough;
