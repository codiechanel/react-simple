import React from 'react';
import ReactDOM from 'react-dom';
//import App from './App';
import './index.css';
import NavBar from './components/NavBar'
// import HotTrends from './components/HotTrends'
import ManageKeywords from './components/ManageKeywords'
import Sidebar from './components/Sidebar'
import SearchResult from './components/SearchResult'
import TopRelated from './components/TopRelated'
import HotTrends from './components/HotTrends'
import Categories from './components/Categories'
import EditKeyword from './components/EditKeyword'
import RisingSearches from './components/RisingSearches'
import Keywords from './components/Keywords'
import App from './App'
import { Provider } from 'react-redux'
import { BrowserRouter, Match } from 'react-router';
import thunk from 'redux-thunk'
import * as constant from './common/constants'

import { createStore, applyMiddleware, combineReducers } from 'redux'
import keywords from './reducers/KeywordsReducer';
import main from './reducers/MainReducer';
import categories from './reducers/CategoriesReducer';

const rootReducer = combineReducers({
  keywords, main, categories
})

const store = createStore(rootReducer, applyMiddleware(thunk))
// const routes = [
//   {
//     pattern: '/',
//     exactly: true,
//     sidebar: () => <div>Home!</div>,
//     main: () => <h2>Main</h2>
//   },
//   {
//     pattern: '/foo',
//     sidebar: () => <div>foo!</div>,
//     main: () => <h2>Foo</h2>
//   },
//   {
//     pattern: '/bar',
//     sidebar: () => <div>Bar!</div>,
//     main: () => <h2>Bar</h2>
//   }
// ]

// localStorage.clear()

window.onload = function() {
     console.log( "react window loaded cool");
     store.dispatch({type: constant.WINDOW_LOADED})
}


ReactDOM.render(<Provider store={store} >
  <BrowserRouter >

    <div style={{ display: 'flex', flex: 1, height: '100%', flexDirection: 'column' }} >
      <NavBar />
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ display: 'flex', flex: .30 }}>
          <Sidebar />
        </div>
        <div style={{ display: 'flex', flex: 1 }}>
          <Match exactly pattern="/" component={App} />
          <Match exactly pattern="/categories" component={Categories} />
           <Match exactly pattern="/risingSearches" component={RisingSearches} />
            <Match exactly pattern="/hotTrends" component={HotTrends} />
      
          <Match exactly pattern="/manageKeywords" component={ManageKeywords} />
              <Match  pattern="/keywords/:id" component={Keywords} />
          <Match pattern="/topRelated/:id" component={TopRelated} />
          <Match pattern="/edit" component={EditKeyword} />
          <Match pattern="/searchResult/:id" component={SearchResult} />
        </div>
      </div>

    </div>
  </BrowserRouter >
</Provider>,
  document.getElementById('root')
);
