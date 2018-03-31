import React, {Component} from 'react';

import './UserProfilePage.css';
import Menu from '../../components/Menu';

export default class UserProfilePage extends Component {
    render() {
        return (
            <div className='UserProfilePage'>
                {'User Profile'}
                <Menu/>
            </div>
        );
    }
}
