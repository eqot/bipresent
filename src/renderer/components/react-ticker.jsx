'use strict';

import React from 'react';

export class ReactTicker extends React.Component {
  render () {
    return <div>
      {this.props.children}
    </div>
  }
}
