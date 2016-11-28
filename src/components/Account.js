/*global AWS, FB*/
import React, { Component } from 'react';
import * as constant from '../common/constants'
import { connect } from 'react-redux'



class Account extends Component {

  constructor(props) {
    super(props);
    this.state = { items: [] }
    this.props = props
    //  this.rows = this.rows.bind(this)
  }

  login() {

    FB.login(function (response) {
      console.log('clk', response)
      if (response.status === 'connected') {

        AWS.config.region = 'us-east-1';
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: 'us-east-1:bad8ac29-9ab5-47f2-9b8c-e2514b0eefc0',
          Logins: {
            'graph.facebook.com': response.authResponse.accessToken
          }
        });

        // Obtain AWS credentials
        AWS.config.credentials.get(function () {
          // Access AWS resources here.
          var identityId = AWS.config.credentials.identityId;
          this.props.dispatch({type:constant.FACEBOOK_CONNECTED })

          console.log('AmazonCognitoIdentity facebook cool', identityId)
        });

      } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        // document.getElementById('status').innerHTML = 'Please log ' +
        //   'into this app.';
      } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        // document.getElementById('status').innerHTML = 'Please log ' +
        //   'into Facebook.';
      }
    })

  }

  render() {
    if (this.props.main.fb_connected) {
      return <div>connected</div>
    }
    else {
   return (<div>
      <i className="fa fa-user" aria-hidden="true"></i> <button onClick={e => this.login()} type="button" className="btn btn-primary">Login</button>
    </div>)
    }
 
  }

}

function mapStateToProps(state, ownProps) {
    return { main: state.main }
}

export default connect(mapStateToProps)(Account)