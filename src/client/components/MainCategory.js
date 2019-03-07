import React, { Component, Fragment } from 'react';
import './MainCategory.scss';

class MainCategory extends Component {
  constructor() {
    super();

    this.renderCategories = this.renderCategories.bind(this);
  }

  componentDidMount() {
    this.props.fetchCategories();
  }

  renderCategories() {
    const { categories } = this.props;

    return categories.map(category => (
      <li className="categories__item" key={category._id}> { category.name }</li>
    ));
  }

  render() {
    return (
      <Fragment>
        <div className="hero row">
          <div className="hero__content">
            <h1 className="hero__content--title-1">Welcome to Readdit, where words matter.</h1>
            <h2 className="hero__content--title-2">We will organize the world's contents.</h2>
          </div>
        </div>
        <ul className="categories row">
          {
            this.renderCategories()
          }
        </ul>
      </Fragment>
    );
  }
}

export default MainCategory;
