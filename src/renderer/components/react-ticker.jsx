'use strict';

import React from 'react';
var _ = require('lodash');

export class ReactTicker extends React.Component {
  styles = {
    text: {
      whiteSpace: 'nowrap',
      fontSize: '30px',

      color: '#f0f0ff',
      textShadow: '1px 1px 3px #000000',

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
    }, 0);
  }

  render () {
    var styles = _.cloneDeep(this.styles.text);
    styles.left = this.state.x;

    return (
      <div style={styles}>
        {this.props.children}
      </div>
    );
  }
}

ReactTicker.defaultProps = {
  y: '0%'
};
