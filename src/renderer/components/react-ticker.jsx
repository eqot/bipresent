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

    this.state = {x: '100%'};
    setTimeout(() => {
      this.setState({x: '-100%'});
    }, 100);
  }

  render () {
    var styles = _.cloneDeep(this.styles.text);
    styles.left = this.state.x;

    return (
      <div style={styles} key={this.props.key}>
        {this.props.children}
      </div>
    );
  }
}

ReactTicker.defaultProps = {
  y: '0%'
};
