import React, { Component } from 'react'
import { updateKeyword } from '../epics/thunks'

export default class EditKeyword extends Component {

  constructor(props, ctx) {
    super(props, ctx);
    this.state = { items: [] }
    this.props = props
    this.store = ctx.store

    console.log(this.props, ctx.store.getState().categories)
    this.options = this.options.bind(this)
  }

  options(item, index) {
    return <option value={item.name}>{item.name}</option>
  }

  save() {
 //  let item = this.props.location.state
    let value =  this.select.options[this.select.selectedIndex].value
    let item = Object.assign({}, this.props.location.state, {  category: value })
    console.log(item, this.select.selectedIndex)

   this.store.dispatch(updateKeyword(item))

  }

  render() {
    let categories = this.store.getState().categories
    return <div>
     <div className="form-group">
        <label htmlFor="exampleSelect1">Example select</label>
        <select ref={(c) => { this.select = c; }} 
        className="form-control" id="exampleSelect1">
          {categories.map(this.options)}
        </select>
      </div>
      <button onClick={e => this.save()} type="button" className="btn btn-primary">Save</button>

    </div>
  }

}

EditKeyword.contextTypes = {
  store: React.PropTypes.object.isRequired,
}