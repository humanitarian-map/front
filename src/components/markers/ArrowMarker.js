import React from 'react';
import {LayerGroup, Polyline, Tooltip, Polygon} from 'react-leaflet';
import * as Victor from 'victor';
import {PropTypes} from 'prop-types';

import {DEFAULT_COLOR} from '../../utils/colors';
import {DEFAULT_ARROWHEAD_SIZE} from '../../utils/sizes';
import {store} from '../../App.store';
import * as actions from '../../App.actions';

export default function ArrowMarker(props) {
    let data;
    if (typeof props.point.data === 'string') {
        data = JSON.parse(props.point.data);
    } else {
        data = props.point.data;
    }
    const arrowheadMultiplier = (data.size || DEFAULT_ARROWHEAD_SIZE) / 100;
    const origin = Victor.fromArray(data.origin);
    const dest = Victor.fromArray(data.dest);
    const canonical = dest.clone().subtract(origin.clone());
    const arrowPoint1 = canonical.clone().multiply(Victor.fromArray([-arrowheadMultiplier, -arrowheadMultiplier])).rotateDeg(25).add(dest.clone());
    const arrowPoint2 = canonical.clone().multiply(Victor.fromArray([-arrowheadMultiplier, -arrowheadMultiplier])).rotateDeg(-25).add(dest.clone());

    return (
        <LayerGroup>
            <Polyline
                color={data.color || DEFAULT_COLOR}
                fillColor={data.color || DEFAULT_COLOR}
                positions={[data.origin, data.dest]}
            />
            <Polyline
                color={data.color || DEFAULT_COLOR}
                fillColor={data.color || DEFAULT_COLOR}
                positions={[data.dest, arrowPoint1.toArray()]}
            />
            <Polyline
                color={data.color || DEFAULT_COLOR}
                fillColor={data.color || DEFAULT_COLOR}
                positions={[data.dest, arrowPoint2.toArray()]}
            />

            <Polygon
                positions={[data.dest, arrowPoint2.toArray(), data.origin, arrowPoint1.toArray()]}
                onClick={() => store.dispatch(actions.clickItem(props.point))}
                opacity={0}
                fillOpacity={0}
            >
                {props.point.name &&
                <Tooltip
                    direction='top'
                    sticky={true}
                    offset={[-13, -20]}
                >
                    <span className='title'>{props.point.name}</span>
                </Tooltip>}
            </Polygon>
        </LayerGroup>
    );
}

ArrowMarker.propTypes = {
    point: PropTypes.object.isRequired,
};
