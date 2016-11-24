import React, { Component } from 'react';
// import Foo from '../Foo'
import { BrowserRouter, Match, Miss, Link } from 'react-router';
// import * as constant from '../common/constants'
import { connect } from 'react-redux'
import Rx from 'rxjs/Rx'
import 'rxjs/add/observable/dom/ajax'

export default class HotTrends extends Component {

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
    let targetLink = `/facebookLis/${index}`

    return (<div className="list-group-item" key={index}>
      <Link to={targetLink}><b> {item.title} </b>  </Link>
     <div dangerouslySetInnerHTML={this.createMarkup(item["ht:news_item"]["0"]["ht:news_item_title"][0])} />
   <div dangerouslySetInnerHTML={this.createMarkup(item["ht:news_item"]["0"]["ht:news_item_snippet"][0])} />
  <div>
  {item["ht:news_item"]["0"]["ht:news_item_source"][0]}
  </div>
  
    </div>)

  }

  render() {
    return (<div style={divStyle} >

      <h1 style={{ padding: '5px' }}>Hot Trends</h1>
      <div style={{ flex: 1 }} className="list-group">
        {this.state.items.map(this.rows)}
      </div>


    </div>)
  }

  componentDidMount() {
    let url = 'http://1de8a0b2-0ee0-4-231-b9ee.azurewebsites.net/hotTrendsDetail'
    const settings2 = {
      url,
      responseType: 'json'
    }

    Rx.Observable.ajax(settings2).subscribe(e => {
      this.setState({ items: e.response.rss.channel[0].item })

      console.log(e.response.rss.channel[0].item, e)
    })

  }


}

const divStyle = {

  display: 'flex',
  // height: '100%',
  flex: 1,
  flexDirection: 'column',
  backgroundColor: '#657687'

}