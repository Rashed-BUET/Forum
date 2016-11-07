
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const dbAnswer = new Mongo.Collection('answer');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('answer', function answersPublication() {
    return dbAnswer.find();
  });
}


Meteor.methods({
  'dbAnswer.insert'(body,questionId) {
    check(body, String);

    // Make sure the user is logged in before inserting a task

    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    dbAnswer.insert({
      body,
      questionId,
      owner:Meteor.user().username,
      createdAt: new Date(), // current time
    });
  },

  'dbAnswer.remove'(answerId) {
    check(answerId, String);
    dbAnswer.remove(answerId);
  },

  'dbAnswer.update'(id,body){
    dbAnswer.update(id, {
      $set: { body: body },
    });
}




})
