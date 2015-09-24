'use strict';

import React from 'react';
var _ = require('lodash');

export class ReactTicker extends React.Component {
  FONT_SIZE = 60;

  styles = {
    text: {
      whiteSpace: 'nowrap',
      fontSize: this.FONT_SIZE + 'px',
      fontWeight: 'bold',

      color: '#ffffff',
      textShadow: '1px 1px 2px #000000, -1px -1px 2px #000000, 1px -1px 2px #000000, -1px 1px 2px #000000',

      position: 'absolute',
      top: this.props.y,
      transition: 'all 8s linear'
    }
  }

  constructor(props) {
    super(props);

    this.state = {x: '100%', shouldRender: true};
    setTimeout(() => {
      this.setState({x: '-100%', shouldRender: false});
    }, 100);
  }

  shouldComponentUpdate () {
    return this.state.shouldRender;
  }

  render () {
    var styles = _.cloneDeep(this.styles.text);
    styles.left = this.state.x;

    var emojiId = Pubsub.getEmojiId(this.props.children);

    return (
      <div style={styles} key={this.props.key}>
        {emojiId ? this.renderEmoji(emojiId) : this.renderChild()}
      </div>
    );
  }

  renderChild () {
    return {this.props.children};
  }

  renderEmoji (emojiId) {
    return <span className={'fa ' + emojiId}></span>;
  }
}

ReactTicker.defaultProps = {
  y: '0%'
};
