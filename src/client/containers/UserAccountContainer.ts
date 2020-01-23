import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';
import UserAccount from '../components/UserAccount';
import { receiveUserPosts } from '../actions/index';
import { LOADING_ARTICLES, FETCH_ARTICLES_BY_CATEGORY } from '../actions/types';

const mapStateToProps = (state) => {
  const keywords = Object.values(state.articles.list).reduce((data, article) => {
    const uniqKeywords = _.uniq(article.keywords);

    uniqKeywords.forEach((word) => {
      if (data[word]) {
        data[word].v++;
      } else {
        data[word] = {
          name: word,
          v: 1,
          category: state.categories.find(item => item._id === article.categoryId[0]).name,
        };
      }
    });

    return data;
  }, {});

  return {
    user: state.auth,
    userPosts: state.userPosts.map(id => state.articles.list[id]),
    categories: state.categories,
    keywords,
    isLoading: state.articles.isLoading,
  };
};

const mapDispatchToProps = dispatch => ({
  onMount: async (id) => {
    dispatch({ type: LOADING_ARTICLES, payload: true });

    const articles = await axios.get(`/api/users/${id}/articles`);

    dispatch(receiveUserPosts(articles.data));
  },

  onInsightMount: async (categories) => {
    dispatch({ type: LOADING_ARTICLES, payload: true });

    Promise.all(categories.map(category =>
      axios.get(`/api/categories/${category._id}/articles`)))
      .then((rawData) => {
        const allArticles = _.flatten(rawData.map(res => res.data));

        dispatch({ type: FETCH_ARTICLES_BY_CATEGORY, payload: allArticles });
      });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserAccount);
