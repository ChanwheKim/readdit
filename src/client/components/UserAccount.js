import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import './UserAccount.scss';
import PropTypes from 'prop-types';
import { FaSpinner } from 'react-icons/fa';
import Insight from './Insight';

class UserAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategory: '',
    };

    this.renderContents = this.renderContents.bind(this);
    this.handleCategoryClicked = this.handleCategoryClicked.bind(this);
  }

  componentDidMount() {
    const { user, onMount } = this.props;

    onMount(user._id);
  }

  handleCategoryClicked(categoryName) {
    this.setState({ selectedCategory: categoryName });
  }

  renderContents() {
    const { userPosts, categories, isLoading } = this.props;
    const { selectedCategory } = this.state;
    let { keywords } = this.props;

    if (this.props.location.pathname === '/user-account/insight') {
      if (selectedCategory) {
        keywords = Object.values(keywords).filter(keyword => keyword.category === selectedCategory);
      } else {
        keywords = Object.values(keywords);
      }

      return (
        <Insight
          categories={categories}
          onInsightMount={this.props.onInsightMount}
          keywords={keywords}
          onClick={this.handleCategoryClicked}
        />
      );
    }

    if (isLoading) {
      return (
        <div className="admin-loader">
            <FaSpinner className="list-wrapper__loader admin" size={40} />
        </div>
      );
    }

    if (!userPosts.length) {
      return <div className="zero-posts">There is no articles you uploaded.</div>;
    }

    return userPosts.map(article => (
      <li key={article._id} className="user-posts__list">
        <a href={article.url} target="_blank" rel="noopener noreferrer">
          <h1 className="user-posts__list--title">{article.title}</h1>
        </a>
        {
          article.description
            ? <span className="user-posts__list--description">{article.description}</span>
            : null
        }
        <span className="user-posts__list--url">{article.url}</span>
      </li>
    ));
  }

  render() {
    return (
      <ul className="user-posts row">
        <div className="user-posts__side-bar">
          <NavLink exact to="/user-account/" activeClassName="link-active">My posts</NavLink>
          <NavLink to="/user-account/insight" activeClassName="link-active">Insight</NavLink>
        </div>
        {this.renderContents()}
      </ul>
    );
  }
}

export default UserAccount;

UserAccount.propTypes = {
  userPosts: PropTypes.array,
  user: PropTypes.object,
  onMount: PropTypes.func,
  onInsightMount: PropTypes.func,
};
