'use strict';

import React from 'react';
import {ReactTicker} from './react-ticker';

export class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      messages: []
    };
    var timer = setInterval(() => {
      if (this.state.index >= this.props.pools.length) {
        clearInterval(timer);
        return;
      }

      var messages = this.state.messages.concat([this.props.pools[this.state.index]]);
      this.setState({
        messages: messages
      });

      this.setState({index: this.state.index + 1});
    }, 1000);
  }

  render() {
    if (this.state.messages.length === 0) {
      return null;
    }

    return (
      <div>
        {this.state.messages.map(this.renderChild)}
      </div>
    );
  }

  renderChild(child, index) {
    var y = Math.random() * 30.0 + '%';

    return (
      <ReactTicker y={y} key={index}>
        {child}
      </ReactTicker>
    );
  }
}

Main.defaultProps = {
  pools: [
    'テスト',
    'キターーーッ',
    'キターーーッ',
    'キターーーッ',
    'foo',
    'bar',
    'baz'
  ]
}
