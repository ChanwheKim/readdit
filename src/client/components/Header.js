import React, { Component } from 'react';
import { IoIosSearch, IoMdContact } from 'react-icons/io';
import './Header.scss';
import PropTypes from 'prop-types';
import HeaderAdmin from './HeaderAdmin';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: '',
      showModal: false,
    };

    this.inputRef = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.showAdminModal = this.showAdminModal.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser();
  }

  handleChange(ev) {
    this.setState({ keyword: ev.target.value });
  }

  handleKeyDown(ev) {
    if (ev.keyCode === 13) {
      console.log('search keyword');
    }
  }

  showAdminModal() {
    this.setState(state => ({ showModal: !state.showModal }));
  }

  renderContent() {
    switch (this.props.auth) {
      case null:
        return null;
      case false:
        return (
          <a href="/auth/google" className="sign-in">Sign in</a>
        );
      default:
        return (
          <div className="header__user-container">
            <IoMdContact className="icon-user" onClick={this.showAdminModal} />
            {
              this.state.showModal &&
              <HeaderAdmin
                onClick={this.showAdminModal}
                onBackgroundClick={this.showAdminModal}
              />
            }
          </div>
        );
    }
  }

  render() {
    return (
      <div className="header">
        <div className="header-main row">
          <a href="/" className="main-name"><div className="header__company-name">Readit</div></a>
          <div className="header__user-input">
            <div className="header__search">
              <IoIosSearch className="icon-search" />
              <input
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
                className="input-keyword"
                ref={this.inputRef}
              />
            </div>
            {this.renderContent()}
          </div>
        </div>
      </div>
    );
  }
}

export default Header;

Header.propTypes = {
  auth: PropTypes.object,
  fetchUser: PropTypes.func,
};
