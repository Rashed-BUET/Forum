import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


export const dbQuestion = new Mongo.Collection('question');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('question', function questionsPublication() {
    return dbQuestion.find();
  });
}


Meteor.methods({
  'dbQuestion.insert'(title,body) {
    check(title, String);
    check(body, String);

    // Make sure the user is logged in before inserting a task

    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    dbQuestion.insert({
      title,
      body,
      createdAt: new Date(),
      owner: Meteor.user().username,
    });
    FlowRouter.go('/questionlist');
  },

  'dbQuestion.remove'(questionId) {
    check(questionId, String);
    dbQuestion.remove(questionId);
    FlowRouter.go('/questionlist');
  },



})
