import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom';

var loadRemoteComponent = async function ({name, src}) {
  const response = await fetch(src);
  const code = await response.text();
  var func = new Function("self", "window", "'use strict';" + code);
  const obj = {
    ReactDOM,
    React,
    PropTypes
  }
  func.call(obj, obj, window);
  return obj[name].default;
};

export default class App extends Component {
  state = {
    el: null,
    err: null
  }
  constructor() {
    super();
    setTimeout(async () => {
      try {
        await loadRemoteComponent({
          name: 'button',
          src: 'http://localhost:8080/index.es.js'
        }).then((Module) => this.setState({
          el: <Module text='hello'/>
        }));

      } catch(e) {
        this.setState({
          err: e
        })
      }

    }, 2000)
  }
  render () {
    return (
      <div>
        {this.state.err ? `error: ${ this.state.err }`: this.state.el ? this.state.el : 'loading'}
      </div>
    )
  }
}
