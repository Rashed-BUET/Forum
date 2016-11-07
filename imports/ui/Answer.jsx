

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { dbQuestion }   from '../api/question.js';
import { dbAnswer } from '../api/answer.js';


// Task component - represents a single todo item

export default class Answer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
    };
  }
  updateEditMode(){
    this.setState({
      editMode: !this.state.editMode,
    });
  }


  handleSubmit(event){
    event.preventDefault();

    Meteor.call('dbAnswer.update', this.props.answer._id, this.refs.body.value);

    dbAnswer.update(this.props.answer._id, {
      $set: { body: this.refs.body.value },
    });

    this.setState({
      editMode: !this.state.editMode,
    });

  }
  deleteThisAnswer(){
    Meteor.call('dbAnswer.remove', this.props.answer._id);
  }
  getButtons(){
    if(Meteor.user()!= null){
      if(Meteor.user().username == this.props.answer.owner)
      {
        return(
          <div>
            <button type="button" className="btn btn-danger"  onClick={this.deleteThisAnswer.bind(this)}>Delete the Answer</button>
            <button type="button" className="btn btn-warning marLeft" onClick={this.updateEditMode.bind(this)}>Update the Answer</button>
          </div>
        );
      }
   }
    return <div></div>;
  }
  getMeteorData(){
      if(!this.state.editMode){
        return(
                <div>
                <div className="row">
                  <div className="col-md-8">
                    <div className="row">
                      <p>{this.props.answer.body}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="container avater">
                      <img src="http://semantic-ui.com/images/avatar2/large/matthew.png" alt="..." className=" person"/>
                      <p>Answered By: {this.props.answer.owner}</p>
                      <p>Answered: {this.props.answer.createdAt.toDateString()}</p>
                    </div>
                  </div>
                </div>
                  {this.getButtons()}
                </div>
        );
      }
      else{
        return(
          <div className="jumbotron container">
            <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
              <div className="form-group">
                <div className="col-sm-10">
                  <textarea className="form-control" ref="body" rows="10"  id="inputPassword3" defaultValue={this.props.answer.body}></textarea>
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


  render() {
    return (
      <div className="question container" key={this.props.j}>
        {this.getMeteorData()}
      </div>
    );
  }
}
