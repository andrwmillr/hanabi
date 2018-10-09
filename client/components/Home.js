import React from 'react';
import Walkthrough from './Walkthrough';

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      walkthroughPage: false,
    };
    this.showWalkthrough = this.showWalkthrough.bind(this);
  }

  showWalkthrough() {
    this.setState(prevState => ({
      walkthroughPage: !prevState.walkthroughPage,
    }));
  }

  render() {
    if (!this.state.walkthroughPage) {
      return (
        <div id="home" className="content horiz-flex">
          <button
            className="button -regular"
            type="button"
            onClick={this.showWalkthrough}
          >
            Learn the rules
          </button>
          <button
            className="button -regular"
            type="button"
            onClick={this.props.enterNewGameScreen}
          >
            Start a game
          </button>
        </div>
      );
    } else {
      return (
        <div id="walkthrough" className="content">
          <Walkthrough showWalkthrough={this.showWalkthrough} />
        </div>
      );
    }
  }
}
