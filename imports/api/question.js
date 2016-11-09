import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


export const dbQuestion = new Mongo.Collection('question');

dbQuestion.schema = new SimpleSchema({
  title: {type: String, optional:false},
  body: {type: String },
  owner: {type: String, optional:true },
  createdAt: {type: Date, optional: true}
});



if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('question', function questionsPublication() {
    return dbQuestion.find();
  });
}


Meteor.methods({



  /*==============================================================================*/
  'dbQuestion.insert'(title,body) {
    const question = {
      title,
      body,
      owner: Meteor.user().username,
      createdAt: new Date(),

    };
    dbQuestion.schema.validate(question);
    // Make sure the user is logged in before inserting a task

    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    dbQuestion.insert(question);
    FlowRouter.go('/questionlist');
  },





  'dbQuestion.update'(id,title,body){
    const question = dbQuestion.findOne(id);

    if(question.owner == Meteor.user().username){
      dbQuestion.update(id, {
        $set: { title,body },
      });
    }
    else{
      throw new Meteor.Error('not-authorized');
    }
  },

  'dbQuestion.remove'(questionId) {
    check(questionId, String);


    const question = dbQuestion.findOne(questionId);

    if(question.owner == Meteor.user().username){
      dbQuestion.remove(questionId);
    }
    else{
      throw new Meteor.Error('not-authorized');
    }


    FlowRouter.go('/questionlist');
  },



})
