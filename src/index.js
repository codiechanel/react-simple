import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import NavBar from './components/NavBar'
import { BrowserRouter, Match, Miss, Link } from 'react-router';

import { createStore, applyMiddleware, combineReducers } from 'redux'

ReactDOM.render(
   <BrowserRouter >
    <div style={{ display: 'flex', flex: 1, height: '100%', backgroundColor: '#050600', flexDirection: 'column' }} >
   <NavBar />
  <App />
  </div>
   </BrowserRouter >,
  document.getElementById('root')
);
