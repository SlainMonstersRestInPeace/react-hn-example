import React from 'react'
import MainView from './views/MainView'

import { BrowserRouter as Router } from 'react-router-dom'

export default () => {
  return (
    <Router>
      <MainView />
    </Router>
  );
}