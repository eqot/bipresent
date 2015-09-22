'use strict';

import React from 'react';
import {ReactTicker} from './react-ticker';

export class ReactMessage extends React.Component {
  constructor(props) {
    super(props);

    this.pubsub = new Pubsub('bipresent', 'https://eq-pubsub.herokuapp.com/');
    this.pubsub.subscribe(this.onReceive.bind(this));

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

  onReceive(message) {
    // console.log('received: ' + message);

    var messages = this.state.messages.concat([message]);
    this.setState({
      messages: messages
    });

  }

  onClick() {
    this.pubsub.publish('いいね!');
  }

  render() {
    if (this.state.messages.length === 0) {
      return null;
    }

    return (
      <div>
        <button onClick={this.onClick.bind(this)}>Send</button>
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

ReactMessage.defaultProps = {
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
