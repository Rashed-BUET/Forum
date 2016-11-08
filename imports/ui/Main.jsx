

import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import React, { Component } from 'react';

import Categories from './Categories.jsx';

// Task component - represents a single todo item

export default class Task extends Component {

  render() {
    return (
      <div>
        <nav className="navbar navbar-default">
            <div className="row">
              <div className="col-md-4">
              </div>
              <div className="col-md-4">
               </div>
              <div className="col-md-4">
                <AccountsUIWrapper/>
                </div>
            </div>
        </nav>
        <div className="container">
          <div className="jumbotron">
            <h1>Welcome There!</h1>
            <p>This is the best website for your question and answer :P. If you have any question to ask then post it.</p>
            <p><a className="btn btn-primary btn-lg" href="/questionlist" role="button">Browse Question</a><a className="btn btn-primary btn-lg marLeft" href="/post" role="button">Post Question</a></p>
        </div>
        </div>
      </div>
    );
  }
}
