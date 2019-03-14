import React, { Component } from 'react';
import { FaHashtag, FaSeedling } from 'react-icons/fa';
import './ArticleItem.scss';
import PropTypes from 'prop-types';

class ArticleItem extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(ev) {
    const articleId = ev.currentTarget.dataset.id;
    const { article, onLikeClick } = this.props;

    if (!articleId || !article || !onLikeClick) {
      return;
    }

    onLikeClick(article);
  }

  renderKeywords() {
    const { keywords } = this.props.article;

    return keywords.map((keyword) => {
      const key = keyword + Math.random();

      return (
        <li className="keyword" key={key}>
          <FaHashtag size={10} className="icon-keywords" />
          {keyword}
        </li>
      );
    });
  }

  render() {
    const { article } = this.props;
    const defaultImg = 'http://merryukulele.com/wps/wp-content/uploads/2019/03/main.jpg';

    return (
      <div className="article list">
        <div className="article list__info">
          <div className="article list__info--details">
            <a href={article.url} target="_blank"><h1>{article.title}</h1></a>
            {
              article.description &&
              <span className="description">{article.description}</span>
            }
            {
              article.author &&
              <span className="author">by {article.author}</span>
            }
            {
              !!article.keywords.length &&
              <ul className="keywords-container">
                {this.renderKeywords()}
              </ul>
            }
          </div>
          <div className="article list__info--url">{article.url}</div>
        </div>
        <img
          className="article list__image"
          src={article.image ? article.image : defaultImg}
          alt={article.title}
        />
        <div className="article-like" data-id={article._id} onClick={this.handleClick}>
          <FaSeedling size={20} className="icon-like" />
          <span className="like-count">
            {
              article.like.length === 0 || article.like.length === 1
                ? article.like.length + ' seed'
                : article.like.length + ' seeds'
            }
          </span>
        </div>
      </div>
    );
  }
}

export default ArticleItem;

ArticleItem.propTypes = {
  article: PropTypes.object,
  onLikeClick: PropTypes.func,
};
