import React from 'react';

const Walkthrough = props => {
  return (
    <div className="vert-flex">
      <div className="setup-item">
        Learn the rules{' '}
        <a
          href="https://en.wikipedia.org/wiki/Hanabi_(card_game)#Gameplay"
          rel="noopener noreferrer"
          target="_blank"
        >
          here
        </a>. Walkthrough coming soon.
      </div>
      <button
        className="setup-item"
        type="button"
        onClick={props.showWalkthrough}
      >
        Back
      </button>
    </div>
  );
};

export default Walkthrough;
