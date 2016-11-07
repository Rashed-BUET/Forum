

import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';



import Categories from './Categories.jsx';
import Answer from './Answer.jsx';
import { dbQuestion } from '../api/question.js';
import { dbAnswer } from '../api/answer.js';
import ReactDOM from 'react-dom';





// Task component - represents a single todo item
class Question extends Component {


  handleSubmit(event){
    event.preventDefault();
    const body = ReactDOM.findDOMNode(this.refs.body).value.trim();

    Meteor.call('dbAnswer.insert', body, this.props.id);

    ReactDOM.findDOMNode(this.refs.body).value = '';
  }

  handleDelete(){
    Meteor.call('dbQuestion.remove', this.props.id);
  }
  getButtons(question){
    if(Meteor.user()!= null){
      if(Meteor.user().username == question.owner)
      {
        return(
          <div>
            <button type="button" className="btn btn-danger" onClick={this.handleDelete.bind(this)}>Delete the Question</button>
            <button type="button" className="btn btn-warning marLeft">Update the Question</button>
          </div>
        );
      }
   }
    return <div></div>;
  }

  renderQuestion() {
    return this.props.questions.map((question,i) => (
      <div className="question container" key={i}>
        <div className="row">
          <div className="col-md-8">
            <div className="row questionHeading">
              <h1>{question.title}</h1>
            </div>
            <div className="row">
              <p>{question.body}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="container avater">
              <img src="http://semantic-ui.com/images/avatar2/large/matthew.png" alt="..." className=" person"/>
              <p>Posted By: {question.owner}</p>
              <p>Published Date: {question.createdAt.toDateString()}</p>
            </div>
          </div>          
        </div>
        {this.getButtons(question)}
      </div>
    ));
  }
  renderAnswer() {
    return this.props.answers.map((answer,j) => (
      <div>
        <Answer
           j={j}
           answer={answer}
          />
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



        {this.renderQuestion()}
        {this.renderAnswer()}




        <div className="jumbotron container">
          <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group">
              <div className="col-sm-10">
                <textarea className="form-control" ref="body" rows="10"  id="inputPassword3" placeholder="Type your answer of the question here..."></textarea>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button type="submit" className="btn btn-success">Answer</button>
                <a  className="btn btn-default marLeft" href="/">Return Home</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}



export default createContainer((props) => {
  Meteor.subscribe('question');
  Meteor.subscribe('answer');
  return {
    questions: dbQuestion.find({_id: props.id}).fetch(),
    answers: dbAnswer.find({questionId:props.id}).fetch(),
  };
}, Question);
