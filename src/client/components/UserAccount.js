import React, { Component } from 'react';
import './UserAccount.scss';
import PropTypes from 'prop-types';

class UserAccount extends Component {
  constructor(props) {
    super(props);

    this.renderPosts = this.renderPosts.bind(this);
  }

  componentDidMount() {
    const { user, onMount } = this.props;

    onMount(user._id);
  }

  renderPosts() {
    const { userPosts } = this.props;

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
        {this.renderPosts()}
      </ul>
    );
  }
}

export default UserAccount;

UserAccount.propTypes = {
  userPosts: PropTypes.array,
  user: PropTypes.object,
  onMount: PropTypes.func,
};
