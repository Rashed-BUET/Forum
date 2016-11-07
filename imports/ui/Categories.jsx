

import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { dbCategories } from '../api/categories.js';
// Task component - represents a single todo item

class Categories extends Component {

  renderCategories() {
    return this.props.categories.map((categories) => (

      <li><a href="#">{categories.name}</a></li>
    ));
  }


  render() {
    return (
      <div className="dropdown">
        <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
          Categories
           <span className="caret"></span>
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
          {this.renderCategories()}
        </ul>
      </div>
    );
  }
}



export default createContainer(() => {
  return {
    categories: dbCategories.find({}).fetch(),
  };
}, Categories);
