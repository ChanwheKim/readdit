import React, { useCallback, useEffect } from 'react';
import { BrowserRouter as Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const HeaderAdmin = (props) => {
  const onBackdropClick = useCallback((e) => {
    const headerAdmin = e.target.closest('.header__admin-modal');
    const userIcon = e.target.closest('.icon-user');

    if (!userIcon && !headerAdmin) {
      props.onBackgroundClick();
    }
  });

  useEffect(() => {
    window.document.body.addEventListener('click', onBackdropClick);
    return () => {
      window.document.body.removeEventListener('click', onBackdropClick);
    };
  });

  return (
    <ul className="header__admin-modal" onClick={props.onClick}>
      <Link to="/">Home</Link>
      <Link to="/user-account">My account</Link>
      <Link to="/new-article">New article</Link>
      <a href="/api/logout">Sign out</a>
    </ul>
  );
};

export default HeaderAdmin;

HeaderAdmin.propTypes = {
  onBackgroundClick: PropTypes.func,
  onClick: PropTypes.func.isRequired
};
