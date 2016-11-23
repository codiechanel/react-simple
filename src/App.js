import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import googleTrends from 'google-trends-api'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React cool</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }

  componentDidMount() {
    googleTrends.trendData({ keywords: 'OJ Simpson' })
      .then(function (trendData) {
        console.log('here are the results', trendData);
      })

  }

}

export default App;
