import React, { Component, Fragment } from 'react';
import './PostArticleSection.scss';
import { IoMdArrowDropdown } from 'react-icons/io';
import { FaSpinner } from 'react-icons/fa';
import PropTypes from 'prop-types';
import Selection from './Selection';
import ArticleList from './ArticleItem';
import Modal from './Modal';

class PostArticleSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      showSelection: false,
      categoryIdSelected: '',
    };

    this.inputRef = React.createRef();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.toggleSelection = this.toggleSelection.bind(this);
    this.setCategoryId = this.setCategoryId.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.onUnmount();
  }

  clearInput() {
    this.setState({
      url: '',
      categoryIdSelected: '',
    });
  }

  handleInputChange(ev) {
    this.setState({ url: ev.target.value });
  }

  handleKeyDown(ev) {
    if (ev.keyCode === 13) {
      this.handleSubmit();
    }
  }

  handleBtnClick() {
    this.handleSubmit();
  }

  handleSubmit() {
    const { url, categoryIdSelected } = this.state;

    if (!url || !categoryIdSelected) {
      return this.props.onNotEnoughInfo('You forgot to enter some required information.');
    }

    this.props.onSubmit(url, categoryIdSelected);
    this.clearInput();
    this.inputRef.current.value = '';
  }

  setCategoryId(id) {
    this.setState({
      categoryIdSelected: id,
      showSelection: false,
    });
  }

  toggleSelection() {
    this.setState(state => ({ showSelection: !state.showSelection }));
  }

  render() {
    const { categories, newArticle, modal, onModalClick } = this.props;
    const { showSelection, categoryIdSelected, url } = this.state;
    const isLoading = newArticle.isPosting;
    const gotNewArticle = !!Object.values(newArticle.article).length;

    return (
      <div className="new-article-wrapper row">
        <div className="new-article">
          {
            categoryIdSelected &&
            <div className="new-article__category-label">
              {categories.find(item => item.id === categoryIdSelected).name}
            </div>
          }
          {
            showSelection &&
            <Selection
              list={categories}
              onBackgroundClick={this.toggleSelection}
              onClick={this.setCategoryId}
            />
          }
          <IoMdArrowDropdown
            className={
              this.state.showSelection
                ? "new-article__icon-category rotate"
                : "new-article__icon-category"
              }
            size={30}
            onClick={this.toggleSelection}
          />
          <input
            className="new-article__input"
            id="new-article__input"
            type="url"
            placeholder="Please put your link here.."
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyDown}
            minLength="4"
            ref={this.inputRef}
          />
          <button
            className="new-article__btn-submit"
            onClick={this.handleBtnClick}
            type="button"
          >
            Submit
          </button>
          <label
            htmlFor="new-article__input"
            className="new-article__input--label"
          >
            Please check the url is valid.
          </label>
        </div>
        <div className="saved-article">
          {
            isLoading &&
            <div className="loader-background">
              <FaSpinner className="saved-article__loader" size={40} />
            </div>
          }
          {
            gotNewArticle &&
            <Fragment>
              <ArticleList article={newArticle.article} />
              <a href="/" className="btn-home">Home <span>&rarr;</span></a>
            </Fragment>
          }
        </div>
        {
          (modal.showModal && modal.message) &&
          <Modal message={modal.message} onClick={onModalClick} />
        }
      </div>
    );
  }
}

export default PostArticleSection;

PostArticleSection.propTypes = {
  categories: PropTypes.array,
  newArticle: PropTypes.object,
  onSubmit: PropTypes.func,
  modal: PropTypes.object,
  onModalClick: PropTypes.func,
  onUnmount: PropTypes.func,
  onNotEnoughInfo: PropTypes.func,
};
