import React from 'react';
import { LayerGroup, Polyline, Tooltip, Polygon } from 'react-leaflet';
import {PropTypes} from "prop-types";
import {DEFAULT_COLOR} from "../../utils/colors";
import {DEFAULT_CROSS_SIZE} from "../../utils/sizes";
import {store} from "../../App.store";
import * as actions from "../../App.actions";

export default function CrossMarker(props) {
    let data;
    if (typeof props.point.Data === 'string') {
        data = JSON.parse(props.point.Data);
    } else {
        data = props.point.Data;
    }

    let size = (data.size || DEFAULT_CROSS_SIZE) / 10000;
    let line1 = [[
        data.position[0] - size,
        data.position[1] - size,
    ], [
        data.position[0] + size,
        data.position[1] + size,
    ]];
    let line2 = [[
        data.position[0] - size,
        data.position[1] + size,
    ], [
        data.position[0] + size,
        data.position[1] - size,
    ]];
    return (
        <LayerGroup>
            <Polyline color={data.color || DEFAULT_COLOR} fillColor={data.color || DEFAULT_COLOR} positions={line1}></Polyline>
            <Polyline color={data.color || DEFAULT_COLOR} fillColor={data.color || DEFAULT_COLOR} positions={line2}></Polyline>

            <Polygon positions={[line1[0], line2[0], line1[1], line2[1]]}
                     onClick={(e) => store.dispatch(actions.clickItem(props.point))}
                     opacity={0}
                     fillOpacity={0}>
              {props.point.Name &&
                <Tooltip direction="top" sticky={true} offset={[-13, -20]}>
                  <span className="title">{props.point.Name}</span>
                </Tooltip>}
            </Polygon>
        </LayerGroup>
    )
}

CrossMarker.propTypes = {
    point: PropTypes.object.isRequired,
}
