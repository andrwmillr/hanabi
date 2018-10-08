import React from 'react';
import Walkthrough from './Walkthrough';

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      submittedName: false,
      walkthroughPage: false,
    };
    this.showWalkthrough = this.showWalkthrough.bind(this);
    // this.inputName = this.inputName.bind(this);
    // this.saveName = this.saveName.bind(this);
  }

  showWalkthrough() {
    this.setState(prevState => ({
      walkthroughPage: !prevState.walkthroughPage,
    }));
  }

  render() {
    if (!this.state.walkthroughPage) {
      return (
        <div>
          <button type="button" onClick={this.props.enterNewGameScreen}>
            Start a new game
          </button>
          <button type="button" onClick={this.showWalkthrough}>
            How to play
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <Walkthrough showWalkthrough={this.showWalkthrough} />
        </div>
      );
    }
  }
}
