import React, { Component } from 'react';
// import Foo from '../Foo'
// import { BrowserRouter, Match, Miss, Link } from 'react-router';
// import * as constant from '../common/constants'
// import { connect } from 'react-redux'
import Rx from 'rxjs/Rx'
import 'rxjs/add/observable/dom/ajax'
import moment from 'moment'

const divStyle = {

  display: 'flex',
  // height: '100%',
  flex: 1,
  flexDirection: 'column',
  backgroundColor: '#657687'

}

export default class SearchResult extends Component {

  constructor(props) {
    super(props);
    this.state = { items: [], value:  props.params.id }
    this.props = props
    this.rows = this.rows.bind(this)
    this.handler = this.handler.bind(this)
  }
  handler() {
  //   let url = `http://api.bing.com/osjson.aspx?query=clooney`
   
    let url = `https://60be0d5f-0ee0-4-231-b9ee.azurewebsites.net/rss?keyword=${this.state.value}`
    const settings2 = {
      url,
      responseType: 'json'
    }

    Rx.Observable.ajax(settings2).subscribe(e => {
      this.setState({ items: e.response })
      console.log(e)
    })

    

  }
  rows(item, index) {
    let thedate =  moment(item.date).fromNow()
 //   console.log(thedate.fromNow())
    return <div className="list-group-item" key={index}><p>{item.title}</p>
   <p>{thedate}</p>
    <a href={item.link} target="_blank"><i  className="fa fa-external-link" aria-hidden="true"></i></a></div>
  }
  render() {
    return <div style={divStyle}>
      <h1 style={{ padding: '5px' }}>Search</h1>

      <div style={{ flex: 1, overflow: 'scroll' }} className="list-group">
        {this.state.items.map(this.rows)}
      </div>

      <div className="input-group">
        <input value={this.state.value} type="text"
          onChange={e => this.setState({ value: e.target.value })}
          className="form-control" placeholder="Search for..." />
        <span className="input-group-btn">
          <button onClick={this.handler} className="btn btn-secondary" type="button">Quick Search!</button>
        </span>
      </div>
    </div>
  }

  componentDidMount() {
   
    //   let url = `http://api.bing.com/osjson.aspx?query=clooney`
   
   let url = `https://60be0d5f-0ee0-4-231-b9ee.azurewebsites.net/rss?keyword=${this.state.value}`
    const settings2 = {
      url,
      responseType: 'json'
    }

    Rx.Observable.ajax(settings2).subscribe(e => {
      this.setState({ items: e.response })
      console.log(e)
    })


  }


}

