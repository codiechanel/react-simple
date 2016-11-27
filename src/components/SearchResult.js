import React, { Component } from 'react';
// import Foo from '../Foo'
import { Link } from 'react-router';
// import * as constant from '../common/constants'
// import { connect } from 'react-redux'
import Rx from 'rxjs/Rx'
import 'rxjs/add/observable/dom/ajax'
import moment from 'moment'
import Spinner from 'react-spinner'

const divStyle = {

  display: 'flex',
  // height: '100%',
  flex: 1,
  flexDirection: 'column',
  backgroundColor: '#657687'

}

const faStyle = {
  fontSize: '1.3rem',
  padding: '5px',

}

export default class SearchResult extends Component {

  constructor(props) {
    super(props);
    this.state = { items: [], value: props.params.id, isLoading: true }
    this.props = props
    this.rows = this.rows.bind(this)
    this.handler = this.handler.bind(this)
  }
  handler() {
    this.performRequest(this.state.value)
  }

  componentWillUpdate(nextProps, nextState) {
    
  }

  performRequest(keyword, refresh = false) {
    //   let url = `http://api.bing.com/osjson.aspx?query=clooney`
    let storageSupport = (typeof (Storage) !== "undefined")

    if (!refresh && storageSupport && localStorage.getItem(keyword)) {
      let items = JSON.parse(localStorage.getItem(keyword))
      this.setState({ items, isLoading: false })
    }
    else {
      let url = `https://037945b8-0ee0-4-231-b9ee.azurewebsites.net//rss?keyword=${keyword}`
      const settings2 = {
        url,
        responseType: 'json'
      }

      Rx.Observable.ajax(settings2).subscribe(e => {
        let items = e.response
        if (storageSupport) {
          if (items.length !== 0) {
            localStorage.setItem(keyword, JSON.stringify(items));
          }
        }
        this.setState({ items, isLoading: false })

      })
    }


  }


  componentWillReceiveProps(nextProps) {
 

    if (nextProps.params.id !== this.props.params.id) {
      this.setState({ value: nextProps.params.id, items: [], isLoading: true })
      //   this.state.value = nextProps.params.id
      this.performRequest(nextProps.params.id)


    }


  }

  refresh() {


    this.setState({ isLoading: true })
    this.performRequest(this.props.params.id, true)
  }

  rows(item, index) {
    let thedate = moment(item.date).fromNow()
    //   console.log(thedate.fromNow())
    return <div className="list-group-item" key={index}><p>{item.title}</p>
      <p className="text-muted">{thedate}</p>
      <a href={item.link} target="_blank"><i className="fa fa-external-link" aria-hidden="true"></i></a></div>
  }
  render() {
    if (this.state.isLoading) {
      return <div style={divStyle}><Spinner /></div>
    }
    else {
      let items = this.state.items
      items.sort((a, b) => {
        return moment(b.date).valueOf() - moment(a.date).valueOf()
      })
      let targetLink = `/topRelated/${this.props.params.id}`
      return <div style={divStyle}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <h1 style={{ padding: '5px' }}>{this.state.value}  </h1>
          <Link to={targetLink}> <i style={faStyle} className="fa fa-link" aria-hidden="true"></i></Link>
          <i style={faStyle} onClick={e => this.refresh()} className="fa fa-refresh" aria-hidden="true"></i>
          <i style={faStyle} className="fa fa-star" aria-hidden="true"></i>
       
        </div>

        <div style={{ flex: 1, overflow: 'scroll' }} className="list-group">
          {items.map(this.rows)}
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
  }

  componentDidMount() {

    this.performRequest(this.props.params.id)


  }


}

