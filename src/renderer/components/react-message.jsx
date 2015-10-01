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

    document.body.addEventListener('keydown', this.onKeyDown.bind(this));

    this.state = {
      index: 0,
      messages: []
    };

    this.timer = null;
  }

  onReceive(data) {
    this.addMessage(data.text);
    accessLogger.info(data.id, data.text);
  }

  onKeyDown(e) {
    var emojiId = Pubsub.KEY_EMOJI_MAP[e.keyCode];
    if (emojiId) {
      this.addMessage(emojiId);

      e.preventDefault();

      return false;
    }
  }

  addMessage(message) {
    var messages = this.state.messages.concat(message);
    this.setState({
      messages: messages
    });

    if (this.timer) {
      clearTimeout(this.timer);
    }

    var self = this;
    this.timer = setTimeout(() => {
      this.setState({
        messages: []
      });

      self.timer = null;
    }, 9000);
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
