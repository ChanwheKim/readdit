import React, { Component } from 'react';
import './Modal.scss';
import { IoMdCheckmark } from 'react-icons/io';

class Modal extends Component {
  constructor(props) {
    super(props);

    this.onBackgroundClick = this.onBackgroundClick.bind(this);
  }

  componentDidMount() {
    window.document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    window.document.body.style.overflow = 'visible';
  }

  onBackgroundClick(ev) {
    const isBackground = (ev.target.classList.contains('modal-background'));

    if (isBackground) {
      this.props.onBackgroundClick();
    }
  }

  render() {
    return (
      <div className="modal-background">
        <div className="page-popup">
          <span className="popup-label">{this.props.message}</span>
          <div className="page-popup__buttons">
            <div className="btn btn-agree" onClick={this.props.onClick}>
              <IoMdCheckmark size={20} />
              <span>Confirm</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
