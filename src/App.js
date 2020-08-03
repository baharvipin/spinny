import React, { Component, Suspense, lazy } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.scss';

// --------Lazy loading--------
const MainLayout = lazy(() => import('./main'));

class App extends Component {
  //  --------------- Rendering ----------------
  renderSpinner() {
    return <Spinner animation="border" variant="primary" />;
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
