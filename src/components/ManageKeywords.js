import React, { Component } from 'react';
// import Foo from '../Foo'
import { Link } from 'react-router';
// import * as constant from '../common/constants'
// import TopRelated from './TopRelated'
import { connect } from 'react-redux'
// import Rx from 'rxjs/Rx'
// import 'rxjs/add/observable/dom/ajax'
import { addKeyword, loadKeywords, deleteKeyword } from '../epics/thunks'

const divStyle = {

    display: 'flex',
    // height: '100%',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#657687'

}

class ManageKeywords extends Component {

    constructor(props) {
        super(props);
        this.state = { items: [], value: '' }
        this.props = props
        this.rows = this.rows.bind(this)
        this.handler = this.handler.bind(this)
    }
    handler() {
        console.log('click')
        this.props.dispatch(addKeyword(this.state.value))

    }
      sort(keywords) {
        keywords.sort(function (a, b) {
            if (a.objectId < b.objectId) return 1;
            if (a.objectId > b.objectId) return -1;
            return 0;
        })
    }
    delete(id, index) {
        console.log('click', id)
        this.props.dispatch(deleteKeyword(id, index))
    }
    rows(item, index) {
        let targetLink = `/searchResult/${encodeURIComponent(item.name)}`
        return <div className="list-group-item" key={index}>
            <Link to={{ pathname: targetLink, state: item }}> {item.name} </Link> <span className="tag tag-pill tag-primary">{item.category}</span>
            <i onClick={e => this.delete(item.objectId, index)} className="fa fa-trash" aria-hidden="true"></i>
            <Link to={{ pathname: '/edit', state: item }}><i  className="fa fa-edit" aria-hidden="true"></i></Link>
        </div>
    }
    render() {
         let keywords = this.props.keywords
            this.sort(keywords)
        return <div style={divStyle}>
            <h1 style={{ padding: '5px' }}>Manage Keywords</h1>

            <div style={{ flex: 1, overflow: 'scroll' }} className="list-group">
                {keywords.map(this.rows)}
            </div>

            <div className="input-group">
                <input value={this.state.value} type="text"
                    onChange={e => this.setState({ value: e.target.value })}
                    className="form-control" placeholder="Search for..." />
                <span className="input-group-btn">
                    <button onClick={this.handler} className="btn btn-secondary" type="button">Quick Add!</button>
                </span>
            </div>
        </div>
    }

    componentDidMount() {
        if (this.props.keywords.length === 0) {

            this.props.dispatch(loadKeywords())
        }

    }


}

function mapStateToProps(state, ownProps) {
    return { keywords: state.keywords }
}

export default connect(mapStateToProps)(ManageKeywords)

