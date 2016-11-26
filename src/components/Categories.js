import React, { Component } from 'react';
import * as constant from '../common/constants'

import { Match, Miss, Link } from 'react-router';
import { connect } from 'react-redux'
import { loadCategories, addCategory } from '../epics/thunks'
class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = { name: '' }
        this.props = props
        this.handler = this.handler.bind(this)
    }


    handler() {
        this.props.dispatch(addCategory(this.state.name))
    }

    rows(item, index) {
        let targetLink = `/facebookList/${item.name}`

        return (<div className="list-group-item" key={index}>
            <Link to={targetLink}><input readOnly style={{ border: 0 }} value={item.name} />  </Link>
        </div>)

    }

    render() {

          const divStyle = {

            display: 'flex',
            // height: '100%',
            flex: 1,
            flexDirection: 'column',
            backgroundColor: '#657687'

        }

        //     console.log(this.state)
        return (<div style={divStyle} >

            <h1 style={{ padding: '5px' }}>Categories</h1>
            <div style={{ flex: 1 }} className="list-group">
                {this.props.categories.map(this.rows)}
            </div>

            <div style={{ alignSelf: 'center' }} className="input-group">
                <input value={this.state.name} type="text"
                    onChange={e => this.setState({ name: e.target.value })}
                    className="form-control" placeholder="Search for..." />
                <span className="input-group-btn">
                    <button onClick={this.handler} className="btn btn-secondary" type="button">Go!</button>
                </span>
            </div>

        </div>)
    }

    componentDidMount() {
        //   console.log('mounting categ')
        
        if (this.props.categories.length === 0) {

            this.props.dispatch(loadCategories())
        }

    }


}

function mapStateToProps(state, ownProps) {
    return { categories: state.categories }
}

export default connect(mapStateToProps)(Categories)