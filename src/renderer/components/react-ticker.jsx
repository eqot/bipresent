'use strict';

import React from 'react';

export class ReactTicker extends React.Component {
  style = {
    text: {
      color: '#ffffff'
    }
  }

  render () {
    return <div style={this.style.text}>
      {this.props.children}
    </div>
  }
}
