import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.scss';

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

  handleChange(ev) {
    this.setState({ keyword: ev.target.value });
  }

  handleKeyDown(ev) {
    if (ev.keyCode === 13) {
      console.log('search keyword');
    }
  }

  showAdminModal() {
    console.log('hello');
    this.setState((state) => ({ showModal: !state.showModal }));
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
            <a href="/api/logout"><li>Logout</li></a>
            {/* <ion-icon name="contact" class="icon-user" onClick={this.showAdminModal}/> */}
            {/* {
              this.state.showModal && 
              (
                <ul className="header__admin-modal">
                  <a href="#">My Account</a>
                  <a href="/api/logout"><li>Logout</li></a>
                </ul>
              )
            } */}
          </div>
        );
    }
  }

  render() {
    return (
      <div className="header">
        <div className="header-main row">
          <div className="header__company-name"></div>
          <div className="header__user-input">
            <div className="header__search">
              <ion-icon name="search" class="icon-search" />
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

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, null)(Header);
