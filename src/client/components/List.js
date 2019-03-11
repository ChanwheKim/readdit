import React, { Component } from 'react';
import './List.scss';
import { FaSpinner } from 'react-icons/fa';
import ArticleList from './ArticleList';
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
    const { articles } = this.props.articles;

    return articles.map(article => (
      <ArticleList
        article={article}
        onLikeClick={this.props.onLikeClick}
        user={this.props.user}
        key={article._id}
      />
    ));
  }

  render() {
    const { isLoading, articles } = this.props.articles;

    if (isLoading) {
      return (
        <div className="list-wrapper row">
          <div className="loader-background">
            <FaSpinner className="list-wrapper__loader" size={40} />
          </div>
        </div>
      );
    }

    if (!articles.length) {
      return (
        <div className="list-wrapper row">
          <div>데이터 없을 때 처리 필요</div>
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
