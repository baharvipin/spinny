import { FaUserCircle } from 'react-icons/fa';
import { Redirect } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import React, { Component } from 'react';

import './Navbar.scss';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSettingModal: false,
      logout: false
    };
  }

  logoutCurrentUser() {
    localStorage.removeItem('user');
    this.setState({ showSettingModal: false, logout: true });
  }

  handleSettingModal() {
    this.setState({ showSettingModal: !this.state.showSettingModal });
  }

  // -----------Render--------------------

  renderSettingModal() {
    if (!this.state.showSettingModal) return null;
    return (
      <div className="setting-modal">
        <div
          className="setting-modal-item"
          onClick={() => this.logoutCurrentUser()}
        >
          Logout
        </div>
      </div>
    );
  }

  renderAvatar() {
    return (
      <FaUserCircle
        className="avatar"
        onClick={e => this.handleSettingModal()}
      />
    );
  }

  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="">Navbar</Navbar.Brand>
        {this.renderAvatar()}
        {this.renderSettingModal()}
        {this.state.logout ? <Redirect to="/signin" /> : null}
      </Navbar>
    );
  }
}

/* Exports ================================================================== */
export default NavBar;
