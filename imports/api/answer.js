
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
    const answer = dbAnswer.findOne(answerId);

    if(answer.owner == Meteor.user().username){
        dbAnswer.remove(answerId);
    }
    else{
      throw new Meteor.Error('not-authorized');
    }

  },

  'dbAnswer.update'(id,body){

    const answer = dbAnswer.findOne(id);

    if(answer.owner == Meteor.user().username){
      dbAnswer.update(id, {
        $set: { body: body },
      });
    }
    else{
      throw new Meteor.Error('not-authorized');
    }


}




})
