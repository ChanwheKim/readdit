import React, { Component } from 'react';
import { BrowserRouter as Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class HeaderAdmin extends Component {
  constructor(props) {
    super(props);

    this.onBackdropClick = this.onBackdropClick.bind(this);
  }

  componentDidMount() {
    window.document.body.addEventListener('click', this.onBackdropClick);
  }

  componentWillUnmount() {
    window.document.body.removeEventListener('click', this.onBackdropClick);
  }

  onBackdropClick(ev) {
    const headerAdmin = ev.target.closest('.header__admin-modal');
    const userIcon = ev.target.closest('.icon-user');

    if (!userIcon && !headerAdmin) {
      this.props.onBackgroundClick();
    }
  }

  render() {
    return (
      <ul className="header__admin-modal" onClick={this.props.onClick}>
        <Link to="/">Home</Link>
        <Link to="/user-account">My account</Link>
        <Link to="/new-article">New article</Link>
        <a href="/api/logout">Sign out</a>
      </ul>
    );
  }
}

export default HeaderAdmin;

HeaderAdmin.propTypes = {
  onBackgroundClick: PropTypes.func,
};
