import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import List from './List';
import './MainCategory.scss';

class MainCategory extends Component {
  constructor() {
    super();

    this.state = {
      curCategoryId: '',
    };

    this.renderCategories = this.renderCategories.bind(this);
    this.handleCategoryClicked = this.handleCategoryClicked.bind(this);
  }

  componentDidMount() {
    this.props.fetchCategories();
  }

  renderCategories() {
    const { categories } = this.props;

    return categories.map(category => (
      <li className="categories__item" data-id={category._id} key={category._id}>
        <Link to="/articles">{ category.name }</Link>
      </li>
    ));
  }

  handleCategoryClicked(ev) {
    const { id } = ev.target.closest('.categories__item').dataset;

    if (id) {
      this.setState({ curCategoryId: id });
      this.props.fetchArticlesByCategory(id);
    }
  }

  render() {
    const { categories, articles, searchedArticles } = this.props;
    const { curCategoryId } = this.state;

    if (this.props.location.pathname === '/articles') {
      const curCategory = categories.find(category => category._id === curCategoryId);
      const list = {
        ...articles,
        list: curCategory.articleIds.map(id => articles.list[id]),
      };

      return (
        <List
          articles={list}
          onLikeClick={this.props.handleLikeClick}
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

    if (this.props.location.pathname === '/articles/keywords') {
      if (searchedArticles.length) {
        const filteredArticles = searchedArticles.map(id => articles.list[id]);
        const articleList = {
          ...articles,
          list: filteredArticles,
        };

        return (
          <List
            articles={articleList}
            onLikeClick={this.props.handleLikeClick}
            modal={this.props.modal}
            onModalClick={this.props.removeModal}
          />
        );
      }

      return (
        <div className="list-no-article">
          <p>There is no articles with the keyword.</p>
          <a href="/" className="list-btn-home">Home <span>&rarr;</span></a>
        </div>
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
  handleLikeClick: PropTypes.func,
  modal: PropTypes.object,
  removeModal: PropTypes.func,
};
