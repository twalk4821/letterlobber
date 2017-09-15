import React, { Component } from 'react';
import HomeContainer from './containers/homeContainer'
import Routes from './Routes.js'

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      representative: null,
      sender: null,
      url: null
    }
    this.setActiveItem = this.setActiveItem.bind(this)
    this.setSender = this.setSender.bind(this)
    this.updatePathToLetter = this.updatePathToLetter.bind(this)
  }

  setActiveItem(item) {
    this.setState({
      representative: item
    })
  }

  setSender(normalizedAddress) {
    this.setState({
      sender: normalizedAddress
    })
  }

  updatePathToLetter(url) {
    this.setState({
      url: url
    })
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">

          <h2>Letter Lobber</h2>
                    <img className="App-logo" src="https://thumb7.shutterstock.com/display_pic_with_logo/137608/102493595/stock-vector-a-ball-of-crumpled-paper-102493595.jpg" />

        </div>
        <Routes 
        setSender={this.setSender} 
        setActiveItem={this.setActiveItem} 
        representative={this.state.representative} 
        sender={this.state.sender}
        updatePathToLetter={this.updatePathToLetter}
        url={this.state.url}
        />
      </div>
    );
  }
}

export default App;
