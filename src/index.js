import React from 'react';
import ReactDOM from 'react-dom';
//import App from './App';
import './index.css';
import NavBar from './components/NavBar'
// import HotTrends from './components/HotTrends'
import ManageKeywords from './components/ManageKeywords'
import Sidebar from './components/Sidebar'
import SearchResult from './components/SearchResult'
import App from './App'
import { Provider } from 'react-redux'
import { BrowserRouter, Match, Link } from 'react-router';
import thunk from 'redux-thunk'

import { createStore, applyMiddleware, combineReducers } from 'redux'
import keywords from './reducers/KeywordsReducer';
import main from './reducers/MainReducer';

const rootReducer = combineReducers({
  keywords,main
})

const store = createStore(rootReducer, applyMiddleware(thunk))
const routes = [
  {
    pattern: '/',
    exactly: true,
    sidebar: () => <div>Home!</div>,
    main: () => <h2>Main</h2>
  },
  {
    pattern: '/foo',
    sidebar: () => <div>foo!</div>,
    main: () => <h2>Foo</h2>
  },
  {
    pattern: '/bar',
    sidebar: () => <div>Bar!</div>,
    main: () => <h2>Bar</h2>
  }
]

ReactDOM.render(<Provider store={store} >
  <BrowserRouter >

    <div style={{ display: 'flex', flex: 1, height: '100%', backgroundColor: '#050600', flexDirection: 'column' }} >
      <NavBar />
      <div style={{ display: 'flex',height: '100%'}}>
     <Sidebar />
      <div style={{ display: 'flex',flex: 1}}> <Match exactly pattern="/" component={App} />
        <Match exactly pattern="/manageKeywords" component={ManageKeywords} />
        <Match pattern="/searchResult/:id" component={SearchResult} />
      </div>
    </div>

    </div>   
  </BrowserRouter >
</Provider>,
  document.getElementById('root')
);
