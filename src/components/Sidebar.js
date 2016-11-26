import React, { Component } from 'react';
// import Foo from '../Foo'
import { Link } from 'react-router';
// import * as constant from '../common/constants'
//import TopRelated from './TopRelated'
import { connect } from 'react-redux'
import {  loadKeywords } from '../epics/thunks'


const divStyle = {

  display: 'flex',
  // height: '100%',
  flex: 1,
  flexDirection: 'column',
  backgroundColor: '#657687'

}

class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.state = { items: [] }
    this.props = props
    this.rows = this.rows.bind(this)
  }
  rows(item, index) {
    let targetLink = `/searchResult/${encodeURIComponent(item.name)}`
    return <div className="list-group-item" key={index}>
      <Link to={targetLink}> {item.name} </Link></div>
  }
  render() {
    return (<div style={divStyle}>
    <div style={{ flex: 1, overflow: 'scroll' }} className="list-group">
        {this.props.keywords.map(this.rows)}
      </div></div>)

  }

  componentWillReceiveProps(nextProps) {

    if (this.props.keywords.length === 0) {

      if (nextProps.main.connected) {
        this.props.dispatch(loadKeywords())
      }


    }
  }


  componentWillUpdate(nextProps, nextState) {

  }


  componentDidMount() {


  }

}

function mapStateToProps(state, ownProps) {
  
  return {
    keywords: state.keywords,
    main: state.main
  }
}

export default connect(mapStateToProps)(Sidebar)