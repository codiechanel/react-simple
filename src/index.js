import React from 'react';
import ReactDOM from 'react-dom';
//import App from './App';
import './index.css';
import NavBar from './components/NavBar'
// import HotTrends from './components/HotTrends'
import Search from './components/Search'
import SearchResult from './components/SearchResult'
import App from './App'
import { Provider } from 'react-redux'
import { BrowserRouter, Match } from 'react-router';
import thunk from 'redux-thunk'

import { createStore, applyMiddleware, combineReducers } from 'redux'
import keywords from './reducers/KeywordsReducer';

const rootReducer = combineReducers({
   keywords
})

const store = createStore(rootReducer, applyMiddleware(thunk))


ReactDOM.render(<Provider store={store} >
   <BrowserRouter >
    <div style={{ display: 'flex', flex: 1, height: '100%', backgroundColor: '#050600', flexDirection: 'column' }} >
   <NavBar />
 
     <Match exactly pattern="/" component={App} />
      <Match exactly pattern="/search" component={Search} />
      <Match exactly pattern="/searchResult/:id" component={SearchResult} />
  </div>
   </BrowserRouter >
   </Provider>,
  document.getElementById('root')
);
