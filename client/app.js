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
    console.log(this.state.roomCreated);
    if (this.state.roomCreated) {
      return (
        <div className="content-container">
          <div className="content">
            <Header />
          </div>
          <div className="content">
            <Game />
          </div>
        </div>
      );
    } else {
      return (
        <div className="content-container">
          <div className="content">
            <Header />
          </div>
          <div className="content">
            <Home enterNewGameScreen={this.enterNewGameScreen} />
          </div>
        </div>
      );
    }
  }
}
