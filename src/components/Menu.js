import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import {Link} from 'react-router-dom';

import {store} from '../App.store';
import * as actions from '../App.actions';

import logoSvg from './img/logo-navbar.svg';
import './Menu.css';

class Menu extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        openDetail: PropTypes.bool.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            displayMarkers: false,
        };
    }

    render() {
        const {openDetail, user} = this.props;
        return (
            <div className='Menu'>
                <div
                    className={'project-info-icon mdi mdi-information-outline mdi-36px ' + (openDetail ? 'active' : '')}
                    onClick={() => store.dispatch(actions.toggleDisplayDetail())}
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

export default connect(
    (state) => ({
        user: state.get('user'),
        openDetail: state.get('display-project-detail'),
    }),
)(Menu);
