

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

  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
    };
  }
  handleUpdate(event){
    event.preventDefault();

    console.log(this.refs.body.value);
    console.log(this);

    Meteor.call('dbQuestion.update', this.props.id, this.refs.questionTitle.value, this.refs.questionBody.value);

    this.setState({
      editMode: !this.state.editMode,
    });
  }
  handleUpdateButton(){
    this.setState({
      editMode: !this.state.editMode,
    });
  }

  handleSubmit(event){
    event.preventDefault();
    const body = ReactDOM.findDOMNode(this.refs.body).value.trim();

    Meteor.call('dbAnswer.insert', body, this.props.id);

    ReactDOM.findDOMNode(this.refs.body).value = '';
  }

  handleDelete(){
    Meteor.call('dbQuestion.remove', this.props.id);
  }

/*====================== update form =========================================*/
  getForm(k,question){
    if(this.state.editMode && Meteor.user().username == question.owner){
      return(

        <div className="jumbotron container" key={k+2}>
          <form className="form-horizontal" onSubmit={this.handleUpdate.bind(this)}>

            <div className="form-group">
              <div className="col-sm-10">
                <input type="text" ref="questionTitle" className="form-control" id="inputEmail3" defaultValue={question.title}/>
              </div>
            </div>

            <div className="form-group">
              <div className="col-sm-10">
                <textarea className="form-control" ref="questionBody" rows="10"  id="inputPassword3" defaultValue={question.body}></textarea>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button type="submit" className="btn btn-success">Update</button>
              </div>
            </div>
          </form>
        </div>
      );
    }
  }

  getButtons(question){
    if(Meteor.user()!= null){
      if(!this.state.editMode && this.props.user.username== question.owner )
      {
        return(
          <div>
            {/*====================== update and deltet button =========================================*/}
            <button type="button" className="btn btn-danger" onClick={this.handleDelete.bind(this)}>Delete the Question</button>
            <button type="button" className="btn btn-warning marLeft" onClick={this.handleUpdateButton.bind(this)}>Update the Question</button>
          </div>
        );
      }
   }
    return <div></div>;
  }
/*====================== Question Body =========================================*/

  getQuestion(question){
    if(!this.state.editMode){
      return(
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
      );
    }
  }

  renderQuestion() {
    return this.props.questions.map((question,i) => (
      <div className="question container" key={i}>
        {this.getQuestion(question)}
        {this.getButtons(question)}
        {this.getForm(i,question)}



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



        {this.renderQuestion()}
        <div className="container marBottom">
          <h1 className="questionHeading">Answers</h1>
        </div>
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
    user: Meteor.user(),
  };
}, Question);
