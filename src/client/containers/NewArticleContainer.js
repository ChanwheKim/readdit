import { connect } from 'react-redux';
import axios from 'axios';
import NewArticle from '../components/NewArticle';
import {
  didPostRequest,
  receiveNewArticle,
  displayModal,
  removeModal,
  resetNewArticleState,
} from '../actions/index';

const mapStateToProps = (state) => {
  const categories = state.categories.map(category => ({
    name: category.name,
    id: category._id,
  }));

  return {
    categories,
    newArticle: state.newArticle,
    modal: state.modal,
  };
};

const mapDispatchToProps = dispatch => ({
  onSubmit: async (url, categoryId) => {
    dispatch(didPostRequest());

    const response = await axios.post('/api/articles/new', {
      url,
      categoryId,
    });

    if (response.data.message) {
      return dispatch(displayModal(response.data.message));
    }

    dispatch(receiveNewArticle(response.data));
  },
  onNotEnoughInfo: (message) => {
    dispatch(displayModal(message));
  },
  onModalClick: () => {
    dispatch(removeModal());
  },
  onUnmount: () => {
    dispatch(resetNewArticleState());
  },
  onBtnLikeClicked: async (userId, articleId) => {
    const response = await axios.post(`/api/users/${userId}/articles/${articleId}`);

    if (response.data.message) {
      return dispatch(displayModal(response.data.message));
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewArticle);
