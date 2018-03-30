import React from 'react';
import {PropTypes} from 'prop-types';

import {POINT_TYPES_OBJ} from '../utils/point_types';

import './MarkerIcon.css';

export default class MarkerIcon extends React.Component {
    static propTypes = {
        type: PropTypes.string,
        active: PropTypes.bool,
        onClick: PropTypes.func,
    };

    render() {
        const {type, active, onClick} = this.props;
        const {icon, name, color} = POINT_TYPES_OBJ[type || 'other'];
        return (
            <div
                className={'MarkerIcon ' + (active ? 'active' : '')}
                onClick={onClick}
            >
                <div
                    className={'marker-icon ' + type + '-icon mdi mdi-' + icon + ' mdi-24px'}
                    style={{'backgroundColor': color}}
                />
                <span>{name}</span>
            </div>
        );
    }
}
