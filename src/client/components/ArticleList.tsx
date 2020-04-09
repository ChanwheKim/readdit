import * as React from "react";
import styled from "@emotion/styled";
import { FaSeedling } from "react-icons/fa";

import Keyword from "./Common/Keyword";
import "./ArticleList.scss";

const DEFAULT_IMAGE =
  "http://merryukulele.com/wps/wp-content/uploads/2019/03/main.jpg";

export default function ArticleList({ article, onLikeClick }) {
  function handleClick(e) {
    const articleId = e.currentTarget.dataset.id;

    if (!articleId || !article || !onLikeClick) {
      return;
    }

    onLikeClick(article);
  }

  function renderKeywords() {
    return article.keywords.map(keyword => {
      const key = keyword + Math.random();
      return (
        <Keyword key={key} keyword={keyword} />
      );
    });
  }

  return (
    <div className="article list">
      <div className="article list__info">
        <div className="article list__info--details">
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            <h1>{article.title}</h1>
          </a>
          {article.description && (
            <span className="description">{article.description}</span>
          )}
          {article.author && (
            <span className="author">by {article.author}</span>
          )}
          {!!article.keywords.length && (
            <ul className="keywords-container">{renderKeywords()}</ul>
          )}
        </div>
        <div className="article list__info--url">{article.url}</div>
      </div>
      <img
        className="article list__image"
        src={article.image ? article.image : DEFAULT_IMAGE}
        alt={article.title}
      />
      <div className="article-like" data-id={article._id} onClick={handleClick}>
        <FaSeedling size={20} className="icon-like" />
        <span className="like-count">
          {article.like.length === 0 || article.like.length === 1
            ? article.like.length + " seed"
            : article.like.length + " seeds"}
        </span>
      </div>
    </div>
  );
}
