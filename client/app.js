import React from 'react';
import Game from './components/Game';
import Home from './components/Home';
import Header from './components/Header';

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
    if (this.state.roomCreated) {
      return (
        <div className="content-container">
          <Header />
          <Game />
        </div>
      );
    } else {
      return (
        <div className="content-container">
          <Header />
          <Home enterNewGameScreen={this.enterNewGameScreen} />
        </div>
      );
    }
  }
}
