import React from 'react';

const Header = props => {
  return (
    <div className="navbar">
      {' '}
      <div style={{ width: '100px' }} />
      <div>
        <img src="./hanabi-logo.jpg" height="75px" width="auto" />
      </div>
      <div
        style={{ width: '100px', display: 'flex', justifyContent: 'flex-end' }}
      >
        <div>
          <a
            href="https://github.com/andrwmillr/hanabi"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img src="./github-logo.png" height="50px" width="auto" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;