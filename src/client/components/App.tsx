import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HeaderContainer from '../containers/HeaderContainer';
import LandingContainer from '../containers/LandingContainer';
import PostSectionContainer from '../containers/PostSectionContainer';
import UserAccountContainer from '../containers/UserAccountContainer';
import Footer from './Footer';

const App = () => (
  <Router>
    <div>
      <HeaderContainer />
      <Route path="/" component={LandingContainer} />
      <Route path="/new-article" component={PostSectionContainer} />
      <Route path="/user-account" component={UserAccountContainer} />
      <Footer />
    </div>
  </Router>
);

export default App;
