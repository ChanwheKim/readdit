import * as React from "react";

import ArticleItem from "./ArticleItem";
import Modal from "./Modal";
import Loading from "./Common/Loading";

interface Article {
  _id: string;
  title: string;
  url: string;
}

interface Articles {
  isLoading: boolean;
  list: Article[];
}

interface ListProps {
  articles: Articles;
  modal: ModalProp;
  onLikeClick: () => void;
  onModalClick: () => void;
}

interface ModalProp {
  showModal: false;
  message: string;
}

export default function List({
  articles,
  modal,
  onLikeClick,
  onModalClick
}: ListProps) {
  const { isLoading, list } = articles;

  const renderArticleItem = () => {
    return list.map(article => (
      <ArticleItem
        article={article}
        onLikeClick={onLikeClick}
        key={article._id}
      />
    ));
  };

  if (isLoading) {
    return (
      <Loading />
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
      {renderArticleItem()}
      {modal.showModal && (
        <Modal message={modal.message} onClick={onModalClick} />
      )}
    </div>
  );
}
