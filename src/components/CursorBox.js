import React from 'react';
import {PropTypes} from 'prop-types';

import './CursorBox.css';

export default class CursorBox extends React.PureComponent {
    static propTypes = {
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
    }

    render() {
        const {lat, lng} = this.props;
        return (
            <div className='CursorBox'>
                <span className='lat'>{lat.toFixed(4)}</span>{','}
                <span className='lng'>{lng.toFixed(4)}</span>
            </div>
        );
    }
}
