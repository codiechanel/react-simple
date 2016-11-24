import React, { Component } from 'react';
// import Foo from '../Foo'
import { BrowserRouter, Match, Miss, Link } from 'react-router';
// import * as constant from '../common/constants'
import { connect } from 'react-redux'
import Rx from 'rxjs/Rx'
import 'rxjs/add/observable/dom/ajax'

export default class TopRelated extends Component {

  constructor(props) {
    super(props);
    this.state = {  items: [] }
    this.props = props
    this.rows = this.rows.bind(this)
  }

  rows(item, index) {
      return <div key={index}>{item} </div>
  }

  showRelated() {
 
    let keyword = encodeURIComponent(this.props.keyword)
       console.log('click',keyword)
     let url = `http://1de8a0b2-0ee0-4-231-b9ee.azurewebsites.net/topRelated?keyword=${keyword}`
    const settings2 = {
      url,
      responseType: 'json'
    }

    Rx.Observable.ajax(settings2).subscribe(e => {
    

     let items = []
     for(var k in e.response[0]) {
       console.log(k)
       items.push(k)
     }
       this.setState({ items})

      console.log(e.response[0], e)
    })
  }

  render() {
    return <div onClick={e => this.showRelated()}>Show Related
     {this.state.items.map(this.rows)}</div>
  }

  componentDidMount() {
    
  }
  
}