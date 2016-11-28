import React, { Component } from 'react';
// import Foo from '../Foo'
import { Link } from 'react-router';
// import * as constant from '../common/constants'
//import TopRelated from './TopRelated'
import { connect } from 'react-redux'
import { loadCategories } from '../epics/thunks'


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
        let targetLink = `/keywords/${encodeURIComponent(item.name)}`
        return <div style={{border: 0}} className="list-group-item" key={index}>
            <Link to={targetLink}> {item.name} </Link></div>
    }
    sort(keywords) {
        keywords.sort(function (a, b) {
            if (a.objectId < b.objectId) return 1;
            if (a.objectId > b.objectId) return -1;
            return 0;
        })
    }
    render() {
        let keywords = this.props.categories
        //   this.sort(keywords)

        return (<div style={divStyle}>
            <div style={{ flex: 1, overflowY: 'scroll' }} className="list-group">
              <div className="list-group-item" key='10001'>
                    <Link to='/'><i className="fa fa-user" aria-hidden="true"></i> Account </Link>
                </div>              
                <div className="list-group-item" key='10000'>
                    <Link to='/'><i className="fa fa-user" aria-hidden="true"></i> Manage </Link>
                </div>

                <div className="list-group-item" key='9999'>
                    <Link to='/keywords/Favorites'><i className="fa fa-star" aria-hidden="true"></i> Favorites </Link>
                </div>
                <div className="list-group-item" key='9998'>
                    <Link to='/keywords/Recent'><i className="fa fa-bandcamp" aria-hidden="true"></i> Recent </Link>
                </div>
                  <div className="list-group-item" key='9997'>
                    <Link to='/topRelated/All'><i className="fa fa-university" aria-hidden="true"></i> Top Related </Link>
                </div>
                <div className="list-group-item" key='9996'>
                    <Link to='/risingSearches'><i className="fa fa-eercast" aria-hidden="true"></i> Rising Searches </Link>
                </div>
                       <div className="list-group-item" key='9995'>
                    <Link to='/hotTrends'><i className="fa fa-eercast" aria-hidden="true"></i> Hot Trends </Link>
                </div>
             
                <div className="list-group-item" key='9994'> 
                <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          <i className="fa fa-folder-open" aria-hidden="true"></i> Categories
        </a>

                     <div id="collapseThree" style={{ flex: 1, paddingTop: '5px' }} className="list-group">
  {keywords.map(this.rows)}
                     </div>
                </div>

           
          
              
            </div></div>)

    }

    componentWillReceiveProps(nextProps) {

        if (this.props.categories.length === 0) {

            if (nextProps.main.connected) {
                this.props.dispatch(loadCategories())
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
        main: state.main,
        categories: state.categories
    }
}

export default connect(mapStateToProps)(Sidebar)