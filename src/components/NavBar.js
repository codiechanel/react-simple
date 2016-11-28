/*global AWS, FB*/
import React, { Component } from 'react';
// import Foo from '../Foo'
import { Link } from 'react-router';

// import { connect } from 'react-redux'

class NavBar extends Component {

  constructor(props, ctx) {
    super(props, ctx);
    //    console.log(ctx)
    this.props = props
    // this.state = { status: 'Connecting...' }
    this.store = ctx.store
    // console.log("app constrtr", this.store)

  }

  displayLogin() {
    // console.log(this.props)
    // if (this.state.status === 'Connected') {
    //   return <a className="nav-link" href="/about"> {this.state.status}</a>

    // }
    // else if (this.props.main.winloaded) {

    //   return <div onClick={() => logmein()}>log me in </div>
    // }
    // else {
    //    return null
    // }
  }

  render() {
    return (<nav className="navbar navbar-dark bg-inverse bg-faded">


      <button className="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#nav-content">
          ☰
        </button>

        <div className="collapse navbar-toggleable-xs" id="nav-content">


          <ul className="nav navbar-nav ">
            <li className="nav-item">

              <a className="navbar-brand" href="#">Logo</a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>

            </li>
              <li className="nav-item">
              <Link className="nav-link" to="/manageKeywords">Manage Keywords</Link>

            </li>
         
            <li className="nav-item">
              <Link className="nav-link" to="/categories">Manage Categories</Link>

            </li>
                <li className="nav-item">
                <button type="button" className="btn btn-primary">Login</button>
     
            </li>


        

          </ul>
        </div>

      </nav>    );
  }


  componentDidMount() {
  
  }

}

NavBar.contextTypes = {
  store: React.PropTypes.object.isRequired,
}

// function mapStateToProps(state, ownProps) {
//     return { main: state.main }
// }
export default NavBar
//export default connect(mapStateToProps)(NavBar)
