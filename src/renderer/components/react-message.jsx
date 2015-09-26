'use strict';

import React from 'react';
import {ReactTicker} from './react-ticker';

const remote = require('remote');

const Log4js = remote.require('log4js');
Log4js.configure('log-config.json');
const accessLogger = Log4js.getLogger('access');

export class ReactMessage extends React.Component {
  LINE_HEIGHT = 80;

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

      var messages = this.state.messages.concat(this.props.pools[this.state.index]);
      this.setState({
        messages: messages
      });

      this.setState({index: this.state.index + 1});
    }, 1000);
  }

  onReceive(message) {
    // console.log('received: ' + message);

    var messages = this.state.messages.concat([message.text]);
    this.setState({
      messages: messages
    });

    accessLogger.info(message.text);
  }

  render() {
    if (this.state.messages.length === 0) {
      return null;
    }

    return (
      <div>
        {this.state.messages.map(this.renderChild.bind(this))}
      </div>
    );
  }

  renderChild(child, index) {
    var y = (index & 7) * this.LINE_HEIGHT + 'px';

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
