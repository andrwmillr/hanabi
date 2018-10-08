import React from 'react';

const Walkthrough = props => {
  return (
    <div>
      Rules page<button type="button" onClick={props.showWalkthrough}>
        Back
      </button>
    </div>
  );
};

export default Walkthrough;
