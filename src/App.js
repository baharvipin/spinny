import React, { Component, Suspense, lazy } from 'react';
import GSpinner from './constants/component/spinner/GSpinner';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.scss';

// --------Lazy loading--------
const MainLayout = lazy(() => import('./main'));

class App extends Component {
  //  --------------- Rendering ----------------
  renderSpinner() {
    return <GSpinner variant="primary" />;
  }

  render() {
    return (
      <div>
        <Suspense fallback={this.renderSpinner()}>
          <MainLayout />
        </Suspense>
      </div>
    );
  }
}

export default App;
