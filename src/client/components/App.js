import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HeaderContainer from '../containers/HeaderContainer';
import LandingContainer from '../containers/LandingContainer';
import NewArticleContainer from '../containers/NewArticleContainer';
import Footer from './Footer';

const App = () => (
  <Router>
    <div>
      <HeaderContainer />
      <Route path="/" component={LandingContainer} />
      <Route path="/new-article" component={NewArticleContainer} />
      <Footer />
    </div>
  </Router>
);

export default App;
