import React from 'react';
import Game from './components/Game';
import Home from './components/Home';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      roomCreated: false,
    };
    this.enterNewGameScreen = this.enterNewGameScreen.bind(this);
  }

  enterNewGameScreen() {
    this.setState({ roomCreated: true });
  }

  render() {
    console.log(this.state.roomCreated);
    if (this.state.roomCreated) {
      return (
        <div>
          <Game />
        </div>
      );
    } else {
      return (
        <div>
          <Home enterNewGameScreen={this.enterNewGameScreen} />
        </div>
      );
    }
  }
}
