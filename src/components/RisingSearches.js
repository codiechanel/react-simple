import React, { Component } from 'react';
// import Foo from '../Foo'
import {  Link } from 'react-router';
// import * as constant from '../common/constants'
// import TopRelated from './TopRelated'
// import { connect } from 'react-redux'
import Rx from 'rxjs/Rx'
import 'rxjs/add/observable/dom/ajax'

const divStyle = {

  display: 'flex',
  // height: '100%',
  flex: 1,
  flexDirection: 'column',
  backgroundColor: '#657687'

}

export default class RisingSearches extends Component {

  constructor(props) {
    super(props);
    this.state = { items: [] }
    this.props = props
    this.rows = this.rows.bind(this)
  }

  createMarkup(text) {
    return { __html: text };
  }

  rows(item, index) {
    let targetLink = `/searchResult/${encodeURIComponent(item.name)}`

    return (<div className="list-group-item" key={index}>   
    <Link to={{ pathname: targetLink, state: item }}> {item.name} ({item.value})</Link>


    </div>)

  }

  render() {
    return (<div style={divStyle} >

      <h1 style={{ padding: '5px' }}>Rising Searches</h1>
      <div style={{ flex: 1 }} className="list-group">
        {this.state.items.map(this.rows)}
      </div>


    </div>)
  }

  componentDidMount() {
   let storageSupport = (typeof (Storage) !== "undefined")

    if ( storageSupport && localStorage.getItem('RisingSearches')) {
      let items = JSON.parse(localStorage.getItem('RisingSearches'))
      this.setState({ items})
    }
    else {
  let url = 'https://037945b8-0ee0-4-231-b9ee.azurewebsites.net/risingSearches'
    const settings2 = {
      url,
      responseType: 'json'
    }

    Rx.Observable.ajax(settings2).subscribe(e => {
       let items = []
                let arr = e.response[0]
                console.log(arr)
                for (var k in arr) {
             //         console.log(k, arr[k])
                    if (arr.hasOwnProperty(k)) {
                        items.push({name: k, value: arr[k] })
                    }

                }
                 if (items.length !== 0) {
            localStorage.setItem('RisingSearches', JSON.stringify(items));
          }
      this.setState({ items })

      console.log(items, e)
    })

    }

  
  }


}

