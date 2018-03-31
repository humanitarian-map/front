import React from 'react';
import {PropTypes} from 'prop-types';
import {Link} from 'react-router-dom';

import logoSvg from '../img/logo-navbar.svg';
import './Menu.css';

export default class Menu extends React.Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        openDetail: PropTypes.bool.isRequired,
        actions: PropTypes.shape({
            toggleDisplayDetail: PropTypes.func.isRequired,
        }).isRequired,
    };

    render() {
        const {openDetail, user, actions} = this.props;
        return (
            <div className='Menu'>
                <div
                    className={'project-info-icon mdi mdi-information-outline mdi-36px ' + (openDetail ? 'active' : '')}
                    onClick={() => actions.toggleDisplayDetail()}
                />
                <div className='empty'/>
                <div className='end'>
                    <Link
                        className='user'
                        to='/profile'
                    >
                        <img
                            className='avatar'
                            alt='avatar'
                            src={user.get('avatar')}
                        />
                    </Link>
                    <Link
                        className='logo'
                        to='/projects'
                    >
                        <img
                            src={logoSvg}
                            alt='logo'
                        />
                    </Link>
                </div>
            </div>
        );
    }
}
