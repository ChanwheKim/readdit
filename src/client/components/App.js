import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import HeaderContainer from '../containers/HeaderContainer';
import Footer from './Footer';
import LandingContainer from '../containers/LandingContainer';

const App = () => (
  <Router>
    <div>
      <HeaderContainer />
      <LandingContainer />
      <Footer />
    </div>
  </Router>
);

export default App;
