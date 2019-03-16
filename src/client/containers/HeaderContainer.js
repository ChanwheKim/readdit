import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Header from '../components/Header';
import * as actions from '../actions';

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default withRouter(connect(
  mapStateToProps,
  actions,
)(Header));
