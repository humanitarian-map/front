import React from 'react';
import { LayerGroup, Polyline, Popup } from 'react-leaflet';
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
            <Polyline positions={line1}
                      onMouseOver={(e) => e.target.openPopup()}
                      onMouseOut={(e) => e.target.closePopup()}>
                <Popup>
                  <span className="title">{props.point.name}</span>
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
