import React, { Component } from 'react';
// import Foo from '../Foo'
import { Link } from 'react-router';
import * as constant from '../common/constants'
// import TopRelated from './TopRelated'
// import { connect } from 'react-redux'
import Rx from 'rxjs/Rx'
import 'rxjs/add/observable/dom/ajax'
import Spinner from 'react-spinner'

const divStyle = {

  display: 'flex',
  // height: '100%',
  flex: 1,
  flexDirection: 'column',
  backgroundColor: '#657687'

}

export default class HotTrends extends Component {

  constructor(props) {
    super(props);
    this.state = { items: [], isLoading: true }
    this.props = props
    this.rows = this.rows.bind(this)
  }

  createMarkup(text) {
    return { __html: text };
  }

  performRequest(refresh = false) {
    let storageSupport = (typeof (Storage) !== "undefined")

    if (!refresh && storageSupport && localStorage.getItem('HotTrends')) {
      let items = JSON.parse(localStorage.getItem('HotTrends'))
      this.setState({ items, isLoading: false })
    }
    else {

      let url = `${constant.ENDPOINT}/hotTrendsDetail`
      const settings2 = {
        url,
        responseType: 'json'
      }

      Rx.Observable.ajax(settings2).subscribe(e => {
        let items = e.response.rss.channel[0].item
        if (items.length !== 0) {
          localStorage.setItem('HotTrends', JSON.stringify(items));
        }
        this.setState({ items, isLoading: false })
        console.log(e.response.rss.channel[0].item)
      })

    }


  }

  rows(item, index) {
    let traffic = item["ht:approx_traffic"][0]
    let title = item.title[0]
    let targetLink = `/searchResult/${encodeURIComponent(title)}`


    return (<div className="list-group-item" key={index}>
      <Link to={{ pathname: targetLink, state: item }}> {title}({traffic})</Link>

    </div>)

  }



  //   <Link to={targetLink}><b> {item.title} </b>  </Link>
  // <div dangerouslySetInnerHTML={this.createMarkup(item["ht:news_item"]["0"]["ht:news_item_title"][0])} />
  // <div dangerouslySetInnerHTML={this.createMarkup(item["ht:news_item"]["0"]["ht:news_item_snippet"][0])} />
  // <div>
  //   <a href={item["ht:news_item"]["0"]["ht:news_item_url"][0]}>
  //     {item["ht:news_item"]["0"]["ht:news_item_source"][0]}</a> <span className="tag tag-success">{item["ht:approx_traffic"][0]}</span>
  // </div>
  // <TopRelated keyword={item.title} />

  render() {
    if (this.state.isLoading) {
      return <div style={divStyle}><Spinner /></div>
    }
    else {
      return (<div style={divStyle} >

        <h1 style={{ padding: '5px' }}>Hot Trends</h1>
        <div style={{ flex: 1, overflowY: 'scroll' }} className="list-group">
          {this.state.items.map(this.rows)}
        </div>


      </div>)
    }

  }

  componentDidMount() {
    this.performRequest()

  }


}

