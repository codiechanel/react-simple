import React, { Component } from 'react'
import { updateKeyword } from '../epics/thunks'

export default class EditKeyword extends Component {

  constructor(props, ctx) {
    super(props, ctx);
    this.state = { items: [] }
    this.props = props
    this.store = ctx.store
    this.options = this.options.bind(this)
  }

  options(item, index) {
    return <option key={index} value={item.name}>{item.name}</option>
  }

  save() {
    let value =  this.select.options[this.select.selectedIndex].value
    let item = Object.assign({}, this.props.location.state, {  category: value })
   this.store.dispatch(updateKeyword(item))

  }

  render() {
    let categories = this.store.getState().categories
    return <div style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center'  }}>
     <div  style={{ }} >
        <label  htmlFor="exampleSelect1">{this.props.location.state.name}</label>
        <select ref={(c) => { this.select = c; }} 
        className="form-control" id="exampleSelect1">
          {categories.map(this.options)}
        </select>
         <button onClick={e => this.save()} type="button" className="btn btn-primary">Save</button>

      </div>
     
    </div>
  }

}

EditKeyword.contextTypes = {
  store: React.PropTypes.object.isRequired,
}