import React from 'react';
import {LayerGroup, Polyline, Tooltip, Polygon} from 'react-leaflet';
import {PropTypes} from 'prop-types';
import {DEFAULT_COLOR} from '../../utils/colors';
import {DEFAULT_CROSS_SIZE} from '../../utils/sizes';
import {store} from '../../App.store';
import * as actions from '../../App.actions';

export default function CrossMarker(props) {
    let data;
    if (typeof props.point.data === 'string') {
        data = JSON.parse(props.point.data);
    } else {
        data = props.point.data;
    }

    const size = (data.size || DEFAULT_CROSS_SIZE) / 10000;
    const line1 = [[
        data.position[0] - size,
        data.position[1] - size,
    ], [
        data.position[0] + size,
        data.position[1] + size,
    ]];
    const line2 = [[
        data.position[0] - size,
        data.position[1] + size,
    ], [
        data.position[0] + size,
        data.position[1] - size,
    ]];
    return (
        <LayerGroup>
            <Polyline
                color={data.color || DEFAULT_COLOR}
                fillColor={data.color || DEFAULT_COLOR}
                positions={line1}
            />
            <Polyline
                color={data.color || DEFAULT_COLOR}
                fillColor={data.color || DEFAULT_COLOR}
                positions={line2}
            />

            <Polygon
                positions={[line1[0], line2[0], line1[1], line2[1]]}
                onClick={(e) => store.dispatch(actions.clickItem(props.point))}
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

CrossMarker.propTypes = {
    point: PropTypes.object.isRequired,
};
