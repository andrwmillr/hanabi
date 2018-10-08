import React from 'react';

const Walkthrough = props => {
  return (
    <div>
      <div>
        Learn the rules{' '}
        <a
          href="https://en.wikipedia.org/wiki/Hanabi_(card_game)#Gameplay"
          rel="noopener noreferrer"
          target="_blank"
        >
          here
        </a>.
      </div>
      <button type="button" onClick={props.showWalkthrough}>
        Back
      </button>
    </div>
  );
};

export default Walkthrough;
