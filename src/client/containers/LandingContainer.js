import { connect } from 'react-redux';
import MainCategory from '../components/MainCategory';
import * as actions from '../actions';

const mapStateToProps = state => ({
  categories: state.categories,
  articles: state.articles,
  user: state.auth,
  modal: state.modal,
});

export default connect(
  mapStateToProps,
  actions,
)(MainCategory);
