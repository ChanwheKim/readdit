import { connect } from 'react-redux';
import axios from 'axios';
import UserAccount from '../components/UserAccount';
import { receiveUserPosts } from '../actions/index';

const mapStateToProps = state => ({
  user: state.auth,
  userPosts: state.userPosts,
});

const mapDispatchToProps = dispatch => ({
  onMount: async (id) => {
    const articles = await axios.get(`/api/users/${id}/articles`);

    dispatch(receiveUserPosts(articles.data));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserAccount);
