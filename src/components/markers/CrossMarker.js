import React from 'react';
import { LayerGroup, Polyline, Popup } from 'react-leaflet';
import * as Victor from "victor";
import {PropTypes} from "prop-types";

export default function CrossMarker(props) {
    let line1 = [[
        props.point.position[0] - 0.1,
        props.point.position[1] - 0.1,
    ], [
        props.point.position[0] + 0.1,
        props.point.position[1] + 0.1,
    ]];
    let line2 = [[
        props.point.position[0] - 0.1,
        props.point.position[1] + 0.1,
    ], [
        props.point.position[0] + 0.1,
        props.point.position[1] - 0.1,
    ]];
    return (
        <LayerGroup>
            <Polyline positions={line1}>
                <Popup>
                  <div>
                    <h1>{props.point.name}</h1>
                    {props.point.description &&
                      <p>{props.point.description}</p>}
                  </div>
                </Popup>}
            </Polyline>
            <Polyline positions={line2}>
            </Polyline>
        </LayerGroup>
    )
}

CrossMarker.propTypes = {
    point: PropTypes.object.isRequired,
}
