import React from 'react';
import {PropTypes} from 'prop-types';

import {POINT_TYPES_OBJ} from '../utils/point_types';

import './MarkerIcon.css';

export default class MarkerIcon extends React.Component {
    static propTypes = {
        type: PropTypes.string.isRequired,
        active: PropTypes.bool.isRequired,
        onClick: PropTypes.func.isRequired,
    };

    render() {
        const icon = POINT_TYPES_OBJ[this.props.type || 'other'].icon;
        const name = POINT_TYPES_OBJ[this.props.type || 'other'].name;
        return (
            <div
                className={'MarkerIcon ' + (this.props.active ? 'active' : '')}
                onClick={this.props.onClick}
            >
                <div className={'marker-icon ' + this.props.type + '-icon mdi mdi-' + icon + ' mdi-24px'}/>
                <span>{name}</span>
            </div>
        );
    }
}
