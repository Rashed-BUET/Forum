

import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Categories from './Categories.jsx';
import { dbQuestion }   from '../api/question.js';
import { createContainer } from 'meteor/react-meteor-data';

// Task component - represents a single todo item

class Post extends Component {
  handleSubmit(event) {

    event.preventDefault();
    const title = ReactDOM.findDOMNode(this.refs.title).value.trim();
    const body = ReactDOM.findDOMNode(this.refs.body).value.trim();

    Meteor.call('dbQuestion.insert', title,body);

  }

  renderFomr(){
    if(Meteor.user())
    {
      return(
        <div className="jumbotron">
          <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group">
              <label htmlFor="inputEmail3" className="col-sm-2 control-label">Question Title</label>
              <div className="col-sm-10">
                <input type="text" ref="title" className="form-control" id="inputEmail3" placeholder="Title"/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword3" className="col-sm-2 control-label">Question Body</label>
              <div className="col-sm-10">
                <textarea className="form-control" ref="body" rows="10"  id="inputPassword3" placeholder="Type your Question body here..."></textarea>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button type="submit" className="btn btn-success">Post Question</button>
                <a  className="btn btn-default marLeft" href="/">Return Home</a>
              </div>
            </div>
          </form>
        </div>
      );
    }
    else{
      return(
        <h2>Please Sign in first to post a question.</h2>
      );
    }
  }


  render() {
    return (
      <div>
        <nav className="navbar navbar-default">
            <div className="row">
              <div className="col-md-4">
              </div>
              <div className="col-md-2">
                  <a type="button" className="btn btn-default" href="/">Home</a>
               </div>
               <div className="col-md-2">
                   <a type="button" className="btn btn-default" href="/questionlist">Browse Question</a>
                </div>
              <div className="col-md-4">
                <AccountsUIWrapper/>
                </div>
            </div>
        </nav>
        <div className="container">

          {this.renderFomr()}




        </div>
      </div>
    );
  }
}



export default createContainer((props) => {

  return {
    user: Meteor.user(),
  };
}, Post);
