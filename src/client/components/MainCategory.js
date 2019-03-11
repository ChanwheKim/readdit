import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import List from './List';
import './MainCategory.scss';
import PropTypes from 'prop-types';

class MainCategory extends Component {
  constructor() {
    super();

    this.renderCategories = this.renderCategories.bind(this);
    this.handleCategoryClicked = this.handleCategoryClicked.bind(this);
  }

  componentDidMount() {
    this.props.fetchCategories();
  }

  renderCategories() {
    const { categories } = this.props;

    return categories.map(category => (
      <Link to="/articles" key={category._id}>
        <li className="categories__item" data-id={category._id}>{ category.name }</li>
      </Link>
    ));
  }

  handleCategoryClicked(ev) {
    const { id } = ev.target.dataset;

    if (id) {
      this.props.fetchArticlesByCategory(id);
    }
  }

  render() {
    if (this.props.location.pathname === '/articles') {
      return (
        <List
          articles={this.props.articles}
          onUnmount={this.props.resetArticlesState}
          onLikeClick={this.props.handleLikeClick}
          user={this.props.user}
          modal={this.props.modal}
          onModalClick={this.props.removeModal}
        />
      );
    }

    if (this.props.location.pathname === '/') {
      return (
        <Fragment>
          <div className="hero row">
            <div className="hero__content">
              <h1 className="hero__content--title-1">Welcome to Readdit, where words matter.</h1>
              <h2 className="hero__content--title-2">We will organize the world's contents.</h2>
            </div>
          </div>
          <ul className="categories row" onClick={this.handleCategoryClicked}>
            {
              this.renderCategories()
            }
          </ul>
        </Fragment>
      );
    }

    return null;
  }
}

export default MainCategory;

MainCategory.propTypes = {
  articles: PropTypes.object,
  fetchCategories: PropTypes.func,
  categories: PropTypes.array,
  fetchArticlesByCategory: PropTypes.func,
  resetArticlesState: PropTypes.func,
  handleLikeClick: PropTypes.func,
  user: PropTypes.object,
  modal: PropTypes.object,
  removeModal: PropTypes.func,
};
