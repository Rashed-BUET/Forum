

import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import React, { Component } from 'react';


// Task component - represents a single todo item

export default class Login extends Component {

  render() {
    return (
      <div className="container">
        <div className="rowPadding">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">User SignIn/SignUp</h3>
            </div>
            <div className="panel-body">
              <AccountsUIWrapper/>
            </div>
          </div>


        </div>
      </div>
    );
  }
}
