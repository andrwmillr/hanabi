import React from 'react';
import Walkthrough from './Walkthrough';
import GameScreen from './GameScreen';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      walkthroughPage: false,
      gamePage: false,
    };
    this.toggleWalkthrough = this.toggleWalkthrough.bind(this);
    this.toggleGame = this.toggleGame.bind(this);
  }

  toggleWalkthrough() {
    this.setState(prevState => ({
      walkthroughPage: !prevState.walkthroughPage,
    }));
  }

  toggleGame() {
    this.setState(prevState => ({ gamePage: !prevState.gamePage }));
  }

  render() {
    if (!this.state.walkthroughPage && !this.state.gamePage) {
      return (
        <div id="home" className="content horiz-flex bottom-radius">
          <button
            className="button"
            type="button"
            onClick={this.toggleWalkthrough}
          >
            Learn the rules
          </button>
          <button className="button" type="button" onClick={this.toggleGame}>
            Start a game
          </button>
        </div>
      );
    } else if (this.state.walkthroughPage) {
      return (
        <div id="walkthrough" className="content">
          <Walkthrough toggleWalkthrough={this.toggleWalkthrough} />
        </div>
      );
    } else if (this.state.gamePage) {
      return (
        <div id="game" className="content bottom-radius">
          <GameScreen toggleGame={this.toggleGame} />
        </div>
      );
    }
  }
}
