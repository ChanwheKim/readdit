import React, { useEffect, useRef, useState } from "react";
import { IoIosSearch, IoMdContact } from 'react-icons/io';
import './Header.scss';
// import PropTypes from 'prop-types';
import HeaderAdmin from './HeaderAdmin';

export default function Header ({ auth, fetchUser, handleKeywordSearch, history }): React.FC {
  const [keyword, setKeyword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef();

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && keyword && keyword.length !== 1) {
      handleKeywordSearch(keyword);
      inputRef.current.value = '';
      setKeyword('' );
      history.push('/articles/keywords');
    }
  };

  function showAdminModal() {
    setShowModal(!showModal);
  }

  const renderContent = () => {
    switch (auth) {
      case null:
        return null;
      case false:
        return (
          <a href="/auth/google" className="vabt-cta-btn">Sign in</a>
        );
      default:
        return (
          <div className="header__user-container">
            <IoMdContact className="icon-user" onClick={showAdminModal} />
            {
              showModal &&
              <HeaderAdmin
                onClick={showAdminModal}
                onBackgroundClick={showAdminModal}
              />
            }
          </div>
        );
    }
  };

  useEffect(() => {
   fetchUser();
  }, []);

  return (
    <div className="header">
      <div className="header-main row">
        <a href="/" className="main-name"><div className="header__company-name">Readit</div></a>
        <div className="header__user-input">
          <div className="header__search">
            <IoIosSearch className="icon-search" />
            <input
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="input-keyword"
              ref={inputRef}
            />
          </div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
