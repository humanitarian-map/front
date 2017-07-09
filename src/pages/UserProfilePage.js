import React, { Component } from 'react';
import { connect } from 'react-redux'
import './UserProfilePage.css';
import Menu from '../components/Menu';

class UserProfilePageImpl extends Component {
  render() {
      return (
        <div className="UserProfilePage">
          User Profile
          <Menu user={this.props.user}/>
        </div>
      );
  }
}

const UserProfilePage = connect(
    (state) => ({user: state.user}),
    (dispatch) => ({
    })
)(UserProfilePageImpl);

export default UserProfilePage;
