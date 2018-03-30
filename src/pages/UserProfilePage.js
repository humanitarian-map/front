import React, {Component} from 'react';
import {connect} from 'react-redux';
import './UserProfilePage.css';
import Menu from '../components/Menu';

class UserProfilePage extends Component {
    render() {
        return (
            <div className='UserProfilePage'>
          User Profile
          <Menu/>
            </div>
        );
    }
}

export default connect(
    (state) => ({user: state.get('user')}),
)(UserProfilePage);
