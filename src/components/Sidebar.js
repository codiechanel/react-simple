import React, { Component } from 'react';
// import Foo from '../Foo'
import { Link } from 'react-router';
// import * as constant from '../common/constants'
import TopRelated from './TopRelated'
import { connect } from 'react-redux'
import Rx from 'rxjs/Rx'
import 'rxjs/add/observable/dom/ajax'
import { addKeyword, loadKeywords } from '../epics/thunks'

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
    return ( <div style={{
        padding: '10px',
        width: '25%',
        background: '#f0f0f0'
      }}><div style={{ flex: 1, overflow: 'scroll' }} className="list-group">
      {this.props.keywords.map(this.rows)}
    </div></div>)

  }

  componentWillReceiveProps(nextProps) {
     console.log('is con',nextProps,this.props.main.connected)
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
  console.log('map t st')
  return { 
    keywords: state.keywords, 
    main: state.main }
}

export default connect(mapStateToProps)(Sidebar)