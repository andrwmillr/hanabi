import React from 'react';

const NameEntry = props => {
  return (
    <div className="name-entry">
      <input
        className="name-input"
        type="text"
        placeholder="Your Name"
        onChange={props.inputName}
      />
      <button className="name-submit" type="button" onClick={props.saveName}>
        Save
      </button>
    </div>
  );
};

export default NameEntry;
