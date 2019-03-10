import React, { Component } from 'react';
import './Selection.scss';

class Selection extends Component {
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
    const selection = ev.target.closest('.selection');
    const dropdownIcon = ev.target.closest('.new-article__icon-category');

    if (!selection && !dropdownIcon) {
      this.props.onBackgroundClick();
    }
  }

  render() {
    return (
      <div className="selection-wrapper">
        <ul className="selection" onClick={(ev) => { this.props.onClick(ev.target.id); }}>
          {
            this.props.list.map(item => (
              <li key={item.id} id={item.id}>{item.name}</li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default Selection;
