import React, { Fragment } from 'react';
import './MainPage.scss';

const MainPage = () => {
  return (
    <Fragment>
      <div className="hero row">
        <div className="hero__content">
          <h1 className="hero__content--title-1">Welcome to Readdit, where words matter.</h1>
          <h2 className="hero__content--title-2">We will organize the world's contents.</h2>
        </div>
      </div>
      <div className="categories"></div>
    </Fragment>
  );
};

export default MainPage;
