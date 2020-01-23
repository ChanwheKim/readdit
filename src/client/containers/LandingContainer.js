import { connect } from "react-redux";
import MainCategory from "../components/MainCategory";
import * as actions from "../actions";

const mapStateToProps = state => ({
  categories: state.categories,
  articles: state.articles,
  modal: state.modal,
  searchedArticles: state.searchedArticles
});

export default connect(mapStateToProps, actions)(MainCategory);
