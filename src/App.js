import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Rx from 'rxjs/Rx'
import 'rxjs/add/observable/dom/ajax'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React Netlify</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }

  componentDidMount() {
    // googleTrends.trendData({ keywords: 'OJ Simpson' })
    //   .then(function (trendData) {
    //     console.log('here are the results', trendData);
    //   })

    var options = {

      keywords: ['metallica'],

    }

    // googleTrends.topRelated('dog house')
    //   .then(function (results) {
    //     console.log(results);
    //   })
    //   .catch(function (err) {
    //     console.error(err);
    //   });


    const settings = {
      url: 'https://www.google.com/trends/hottrends/hotItems',
      responseType: 'text',
      method: 'POST',
      crossDomain: true,
      headers: {

        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'ajax=1&pn=p1&htv=m'
    }

    let url = 'http://8115feda-0ee0-4-231-b9ee.azurewebsites.net/hotTrendsDetail'
    const settings2 = {
      url,
      responseType: 'json'
    }

     Rx.Observable.ajax(settings2).subscribe(e => console.log(e))

   

  }

}

export default App;
