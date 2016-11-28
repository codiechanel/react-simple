import React, { Component } from 'react';
// import Foo from '../Foo'
import { Link } from 'react-router';
// import * as constant from '../common/constants'
// import TopRelated from './TopRelated'
import { connect } from 'react-redux'
// import Rx from 'rxjs/Rx'
// import 'rxjs/add/observable/dom/ajax'
import { addKeyword, loadKeywords } from '../epics/thunks'

const divStyle = {

    display: 'flex',
    // height: '100%',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#657687'

}

class Keywords extends Component {

    constructor(props) {
        super(props);
        this.state = { items: [] }
        this.props = props
        this.rows = this.rows.bind(this)
        this.handler = this.handler.bind(this)
    }
    handler() {
        console.log('click', this.input.value)
        this.props.dispatch(addKeyword(this.input.value, this.props.params.id))

    }

       sort(keywords) {
        keywords.sort(function (a, b) {
            if (a.objectId < b.objectId) return 1;
            if (a.objectId > b.objectId) return -1;
            return 0;
        })
    }

    rows(item, index) {
        let targetLink = `/searchResult/${encodeURIComponent(item.name)}`
        return <div className="list-group-item" key={index}>
            <Link to={{ pathname: targetLink, state: item }}> {item.name} </Link>
        </div>
    }
    render() {
        let keywords

        if (this.props.params.id === 'Favorites') {
            keywords = this.props.keywords.filter(item => {
                //    console.log(item.category,this.props.params.id)
                return item.isFavorite
            })
        }
        else if (this.props.params.id === 'Recent') {
              keywords = this.props.keywords
              this.sort(keywords)

        }
        else {
            keywords = this.props.keywords.filter(item => {
                //    console.log(item.category,this.props.params.id)
                return (item.category === this.props.params.id)
            })
        }


        return <div style={divStyle}>
            <h1 style={{ padding: '5px' }}>{this.props.params.id}</h1>

            <div style={{ flex: 1, overflowY: 'scroll' }} className="list-group">
                {keywords.map(this.rows)}
            </div>

            <div className="input-group">
                <input ref={c => this.input = c} type="text"

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

export default connect(mapStateToProps)(Keywords)

