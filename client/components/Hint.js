import React from 'react';
import { hintToText } from '../setup';

export default class Hint extends React.Component {
  constructor() {
    super();
    this.state = {
      hints: {},
      selected: null,
    };
  }

  componentDidMount() {
    this.generateHints(this.props.hand);
  }

  generateHints(hand) {
    let hints = this.state.hints;
    let newHints = { ...hints };
    for (let i = 0; i < 5; i++) {
      let card = hand[i];
      let value = card[0];
      let color = card[1];
      if (!newHints[color]) {
        newHints[color] = [i];
      } else {
        newHints[color].push(i);
      }
      if (!newHints[value]) {
        newHints[value] = [i];
      } else {
        newHints[value].push(i);
      }
    }
    this.setState({ hints: newHints });
  }

  selectHint(evt) {
    let hintType = evt.target.value;
    let cards = this.state.hints[hintType];
    let selected = [hintType, cards];
    this.setState({ selected });
  }

  render() {
    let hints = this.state.hints;
    let hint = this.state.selected;
    return (
      <div>
        <form
          onSubmit={evt => this.props.giveHint(evt, hint)}
          style={{ display: 'flex' }}
        >
          <div className="hint-menu">
            <select onChange={evt => this.selectHint(evt)}>
              <option>Hints</option>
              {Object.keys(hints).map(hintType => {
                let text = hintToText(hints[hintType], hintType);
                return (
                  <option key={text} id={hintType} value={hintType}>
                    {hintType}s ({text})
                  </option>
                );
              })}
            </select>
          </div>
          <button className="hint-submit" type="submit">
            Give Hint
          </button>
        </form>
      </div>
    );
  }
}
