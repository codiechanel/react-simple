import React, { Component } from 'react';
// import Foo from '../Foo'
import { Link } from 'react-router';
// import * as constant from '../common/constants'
// import { connect } from 'react-redux'
import Rx from 'rxjs/Rx'
import 'rxjs/add/observable/dom/ajax'
import moment from 'moment'
import Spinner from 'react-spinner'
import { addFavorite } from '../epics/thunks'

const divStyle = {

  display: 'flex',
  // height: '100%',

  flex: 1,
  flexDirection: 'column',
  backgroundColor: '#657687'

}

const faStyle = {
  fontSize: '1.3rem',
  // padding: '5px',
  color: 'white'
}



const titleStyle = {
  color: 'white',
  fontSize: '1.5rem',
  //  textShadow: '1px 1px #000000',
  fontWeight: 'bold',
  // fontFamily: 'Lato'
  // 'Montserrat'
  // 'Nunito'

}


const footerStyle = {

  display: 'flex',
  paddingLeft: '15px',
  paddingTop: '5px',
  // flexDirection: 'column',
  backgroundColor: 'rgba(0,0,0,.1)',
  borderRadius: '0px 0px 15px 15px',
  // justifyContent: 'flex-end'
}

const headerStyle = {
  // paddingTop: '15px',
  // paddingLeft: '15px',
  // paddingRight: '15px',
  padding: '15px'
}

const rowStyle = {
  // backgroundColor: '#303F9F',
  justifyContent: 'space-between',
  // backgroundImage: "url('/cork-wallet.png')",
   background: "url('/texture3.png') red",
  // backgroundBlendMode: 'lighten',


  display: 'flex',
  flexDirection: 'column',
  margin: '5px',
  flex: '45%',
  borderRadius: '15px'

}


export default class SearchResult extends Component {

  constructor(props, ctx) {
    super(props);
    this.state = { items: [], value: props.params.id, isLoading: true, refresh : false }
    this.props = props
    this.store = ctx.store
    this.rows = this.rows.bind(this)
    this.handler = this.handler.bind(this)
  }
  handler() {
    this.performRequest(this.state.value)
  }

  performRequest(keyword, refresh = false) {
    //   let url = `http://api.bing.com/osjson.aspx?query=clooney`
    let storageSupport = (typeof (Storage) !== "undefined")

    if (!refresh && storageSupport && localStorage.getItem(keyword)) {
      let obj = JSON.parse(localStorage.getItem(keyword))

      this.setState({ items: obj.items, isLoading: false, lastSaved: obj.timestamp })
    }
    else {
      //   let url = `${constant.ENDPOINT}/rss?keyword=${keyword}`
      // let url =    `https://9ouw161vsk.execute-api.us-east-1.amazonaws.com/beta/rss/${keyword}`
      let url = `https://9ouw161vsk.execute-api.us-east-1.amazonaws.com/beta/rss`

      const settings2 = {
        url,
        method: 'POST',
        crossDomain: true,
        responseType: 'json',
        body: JSON.stringify({ "keyword": keyword })
      }

      let timestamp = moment.now()

      Rx.Observable.ajax(settings2).subscribe(e => {

        let items = e.response


        let elapsed = moment().diff(moment(timestamp))
        //  moment(timestamp).from(moment())

        if (refresh) {
          let obj = JSON.parse(localStorage.getItem(keyword))

          this.setState({ items, isLoading: false, elapsed, lastSaved: obj.timestamp })
        }
        else {
          this.setState({ items, isLoading: false, elapsed })
        }

        if (storageSupport) {
          if (items.length >= 0) {

            let obj = {
              timestamp: moment.now(),
              items
            }
            localStorage.removeItem(keyword)
            localStorage.setItem(keyword, JSON.stringify(obj));
          }
        }



      })
    }


  }


  componentWillReceiveProps(nextProps) {
 
    // if (nextProps.params.id !== this.props.params.id) {
    //   this.setState({ value: nextProps.params.id, items: [], isLoading: true })
    //   this.performRequest(nextProps.params.id)
    // }
  }

  favorite() {

    let item = this.props.location.state
    if (!item.hasOwnProperty('isFavorite')) {
      item = Object.assign({}, item, { isFavorite: true })
    }
    else {
      item = Object.assign({}, item, { isFavorite: !item.isFavorite })
    }

    this.store.dispatch(addFavorite(item))

  }

  refresh() {
    this.setState({ isLoading: true, refresh: true })
    this.performRequest(this.props.params.id, true)
  }

  

  showLastSaved() {
    // if (storageSupport && localStorage.getItem(keyword)) {
    //   let obj = JSON.parse(localStorage.getItem(keyword))
    // }

  //  if (this.state)

    let lastSaved = this.state.lastSaved
    if (lastSaved) {
      return <div style={{ padding: '5px' }}>last updated on {moment(lastSaved).format('MMMM Do YYYY, h:mm:ss a')} </div>
    }

  }

  showNew(itemDate) {
    let lastSaved = this.state.lastSaved
    //  console.log('lastSaved',lastSaved,moment(lastSaved).format('MMMM Do YYYY, h:mm:ss a'))

    if (lastSaved && moment(itemDate).isAfter(moment(lastSaved))) {
      return <span style={{ marginBottom: '5px' }} className="tag tag-primary">New</span>
    }
    else {
      return null
    }

  }

  rows(item, index) {
    let thedate = moment(item.pubDate).fromNow()
    let start = item.title.lastIndexOf(" - ")
    let source = item.title.substring(start, item.title.length)
    let title = item.title.replace(source, "")
    // backgroundColor: '#303F9F',
    let colors = ['#303F9F', '#3F51B5', '#448AFF', '#388E3C', '#8BC34A', '#4CAF50', '#455A64', '#607D8B', '#9E9E9E', '#00796B']
    let rowNewStyle = Object.assign({}, rowStyle, { backgroundColor: colors[index] })
  // let rowNewStyle = rowStyle
    return <div style={rowNewStyle} key={index}>
      <div style={headerStyle}>
        <div style={titleStyle}>{title}</div>
        <div style={{ color: 'black' }}>{thedate}</div>

      </div>
      <div style={footerStyle}>

        <div style={{
          color: '#FFA000',
          fontWeight: 'bold',
          paddingRight: '5px'
        }}>{source}</div>
        <div style={{ paddingRight: '5px', color: 'white' }}>
          <a href={item.link} target="_blank"><i style={{ color: 'white' }} className="fa fa-external-link" aria-hidden="true"></i></a>
        </div>
        {this.showNew(item.date)}
      </div>
    </div>
  }

  displayElapsed() {
    if (this.state.elapsed) {
      let elapse = this.state.elapsed

      return <div>{elapse.toLocaleString()}ms</div>
    }
    else return null
  }
  render() {
    if (this.state.isLoading) {
      return <div style={divStyle}><Spinner /></div>
    }
    else {
      let faveStyle = { color: 'white', fontSize: '1.3rem', }
      let item = this.props.location.state
      if (item.isFavorite) {
        faveStyle = { color: 'yellow', fontSize: '1.3rem', }
      }
      let items = this.state.items
      items.sort((a, b) => {
        return moment(b.pubDate).valueOf() - moment(a.pubDate).valueOf()
      })
      let targetLink = `/topRelated/${this.props.params.id}`
      return <div style={divStyle}>
        <div style={{ paddingLeft: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <h1 style={{ padding: '5px' }}>{this.state.value}  </h1>


          <div style={{ padding: '5px', display: 'flex', flexDirection: 'row' }}>

            {this.displayElapsed()}

            <Link to={targetLink}> <i style={faStyle} className="fa fa-link" aria-hidden="true"></i></Link>
            <i style={faStyle} onClick={e => this.refresh()} className="fa fa-refresh" aria-hidden="true"></i>
            <i style={faveStyle} onClick={e => this.favorite()} className="fa fa-star" aria-hidden="true"></i>
          </div>
        </div>

        {this.showLastSaved()}

        <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', flex: 1, overflowY: 'scroll' }} className="list-group">
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

SearchResult.contextTypes = {
  store: React.PropTypes.object.isRequired,
}
