import React from 'react';

const JoinGame = props => {
  return (
    <div id="join-game-div">
      <div />
      <div style={{ display: 'flex' }}>
        <input
          className="name-input join-game-input"
          type="text"
          placeholder="Create a Game"
          onChange={props.inputRoom}
        />
        <button
          className="name-submit join-game-submit"
          type="button"
          onClick={props.createRoom}
        >
          Create
        </button>
      </div>
      <div>
        <form onSubmit={evt => props.joinRoom(evt)} style={{ display: 'flex' }}>
          <div className="hint-menu join-game-input">
            <select onChange={evt => props.inputRoom(evt)}>
              <option>Join a Game</option>
              {props.rooms.map(room => {
                return <option key={room}>{room}</option>;
              })}
            </select>
          </div>
          <button className="hint-submit join-game-submit" type="submit">
            Join
          </button>
        </form>
      </div>
      <div />
    </div>
  );
};

export default JoinGame;
