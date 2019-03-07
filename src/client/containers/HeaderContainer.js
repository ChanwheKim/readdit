import { connect } from 'react-redux';
import Header from '../components/Header';
import * as actions from '../actions';

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(
  mapStateToProps,
  actions,
)(Header);
