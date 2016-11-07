import React from 'react';
import {mount} from 'react-mounter';



import Main from '../imports/ui/Main.jsx';
import Categories from '../imports/ui/Categories.jsx';
import Login from '../imports/ui/Login.jsx';
import Post from '../imports/ui/Post.jsx';
import QuestionList from '../imports/ui/QuestionList.jsx';
import Question from '../imports/ui/Question.jsx';



FlowRouter.route("/", {
  name: 'home',
  action() {
    mount(Main);
  }
});

FlowRouter.route("/question/:id", {
  action(params) {
    mount(Question, {id: params.id});
  }
})

FlowRouter.route("/post", {
  action() {
    mount(Post);
  }
});

FlowRouter.route("/questionlist", {
  name: "questionlist",
  action() {
    mount(QuestionList);
  }
});
FlowRouter.route("/question/:categories", {
  name: "question/:categories",
  action() {
  }
});
