import React, { Component } from 'react';
import './List.scss';
import { FaSpinner } from 'react-icons/fa';
import PropTypes from 'prop-types';
import ArticleItem from './ArticleItem';
import Modal from './Modal';

class List extends Component {
  constructor(props) {
    super(props);

    this.renderArticleItem = this.renderArticleItem.bind(this);
  }

  componentWillUnmount() {
    this.props.onUnmount();
  }

  renderArticleItem() {
    const { list } = this.props.articles;

    return list.map(article => (
      <ArticleItem
        article={article}
        onLikeClick={this.props.onLikeClick}
        key={article._id}
      />
    ));
  }

  render() {
    const { isLoading, list } = this.props.articles;

    if (isLoading) {
      return (
        <div className="list-wrapper row">
          <div className="loader-background">
            <FaSpinner className="list-wrapper__loader" size={40} />
          </div>
        </div>
      );
    }

    if (!list.length) {
      return (
        <div className="list-wrapper row">
          <div>There is no lists in this category.</div>
        </div>
      );
    }

    return (
      <div className="list-wrapper row">
        {
          this.renderArticleItem()
        }
        {
          this.props.modal.showModal &&
          <Modal message={this.props.modal.message} onClick={this.props.onModalClick} />
        }
      </div>
    );
  }
}

export default List;

List.propTypes = {
  onUnmount: PropTypes.func,
  onLikeClick: PropTypes.func,
  modal: PropTypes.object,
  onModalClick: PropTypes.func,
  articles: PropTypes.object,
};
