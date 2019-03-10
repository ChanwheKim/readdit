import React, { Component } from 'react';
import { FaHashtag, FaSeedling } from "react-icons/fa";
import './ArticleList.scss';

class ArticleList extends Component {
  renderKeywords() {
    const { keywords } = this.props.article;

    return keywords.map((keyword, idx) => (
      <li className="keyword" key={keyword + idx}>
        <FaHashtag size={10} className="icon-keywords" />
        {keyword}
      </li>
    ));
  }

  render() {
    const { article } = this.props;
    const defaultImg = 'http://merryukulele.com/wps/wp-content/uploads/2019/03/main.jpg';

    return (
      <a href={article.url} target="_blank">
        <div className="article list">
          <div className="article list__info">
            <div className="article list__info--details">
              <h1>{article.title}</h1>
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
          <div className="article-like">
            <FaSeedling size={20} className="icon-like" />
            <span className="like-count">
              {
                article.like === 0 || article.like === 1
                  ? article.like + ' seed'
                  : article.like + ' seeds'
              }
            </span>
          </div>
        </div>
      </a>
    );
  }
}

export default ArticleList;
