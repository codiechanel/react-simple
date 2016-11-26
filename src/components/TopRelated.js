import React, { Component } from 'react';
// import Foo from '../Foo'
//import { BrowserRouter, Match, Miss, Link } from 'react-router';
// import * as constant from '../common/constants'
// import { connect } from 'react-redux'
import Rx from 'rxjs/Rx'
import 'rxjs/add/observable/dom/ajax'

const divStyle = {

    display: 'flex',
    // height: '100%',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#657687'

}

export default class TopRelated extends Component {

    constructor(props) {
        super(props);
        this.state = { items: [] }
        this.props = props
        this.rows = this.rows.bind(this)
    }

    rows(item, index) {
        return <div className="list-group-item" key={index}>{item} </div>
    }



    render() {
        return <div style={divStyle}>
            <h1 style={{ padding: '5px' }}>Related to {this.props.params.id} </h1>

            {this.state.items.map(this.rows)}</div>
    }

    componentDidMount() {
        let keyword = encodeURIComponent(this.props.params.id)

        let storageSupport = (typeof (Storage) !== "undefined")

        let key = 'related' + this.props.params.id

        if (storageSupport && localStorage.getItem(key)) {
            let items = JSON.parse(localStorage.getItem(key))
            this.setState({ items })
        }
        else {
            let url = `https://60be0d5f-0ee0-4-231-b9ee.azurewebsites.net/topRelated?keyword=${keyword}`
            const settings2 = {
                url,
                responseType: 'json'
            }

            Rx.Observable.ajax(settings2).subscribe(e => {
                let items = []
                let arr = e.response[0]
                for (var k in arr) {
                    if (arr.hasOwnProperty(k)) {
                        items.push(k)
                    }

                }
                if (storageSupport)
                    localStorage.setItem(key, JSON.stringify(items));
                this.setState({ items })


            })

        }



    }

}