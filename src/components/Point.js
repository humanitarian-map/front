import React from 'react';
import {PropTypes} from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import ArrowMarker from './markers/ArrowMarker';
import PointMarker from './markers/PointMarker';
import CrossMarker from './markers/CrossMarker';
import PolygonMarker from './markers/PolygonMarker';

export class Point extends React.Component {
    static propTypes = {
        point: ImmutablePropTypes.mapContains({}).isRequired,
        selected: PropTypes.bool,
        draggable: PropTypes.bool,
        onMoveMarker: PropTypes.func,
    }

    render() {
        const {point, selected, draggable, onMoveMarker} = this.props;

        switch (point.get('type')) {
        case 'point':
            return (
                <PointMarker
                    selected={selected}
                    point={point.toJS()}
                    draggable={draggable}
                    onMoveMarker={onMoveMarker}
                />
            );
        case 'arrow':
            return (
                <ArrowMarker
                    selected={selected}
                    point={point.toJS()}
                />
            );
        case 'cross':
            return (
                <CrossMarker
                    selected={selected}
                    point={point.toJS()}
                />
            );
        case 'polygon':
            return (
                <PolygonMarker
                    selected={selected}
                    point={point.toJS()}
                />
            );
        }
        return null;
    }
}

