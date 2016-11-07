

import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Categories from './Categories.jsx';
import { dbQuestion } from '../api/question.js';


// Task component - represents a single todo item

class QuestionList extends Component {

  renderQuestion() {

    return this.props.questions.map((question) => (
      <div className="alert alert-info" role="alert">
        <a href={'/question/' + question._id}>{question.title}</a>
        </div>
    ));

  }


  render() {
    return (
      <div>
        <nav className="navbar navbar-default">
            <div className="row">
              <div className="col-md-4">
                <i className="fa fa-question-circle fa-5x" aria-hidden="true"></i>
              </div>
              <div className="col-md-4">
                  <a type="button" className="btn btn-success" href="/">Home</a>
               </div>
              <div className="col-md-4">
                <AccountsUIWrapper/>
                </div>
            </div>
        </nav>
        <div className="container">
          <div className="panel panel-info">
            <div className="panel-heading">
              Question Lists
            </div>
            <div className="panel-body">
              {this.renderQuestion()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}



export default createContainer(() => {
   Meteor.subscribe('question');
  return {
    questions: dbQuestion.find({}).fetch(),
  };
}, QuestionList);
