import React from 'react';
import { LayerGroup, Polyline, Popup, Polygon } from 'react-leaflet';
import {PropTypes} from "prop-types";

export default function CrossMarker(props) {
    let line1 = [[
        props.point.data.position[0] - 0.1,
        props.point.data.position[1] - 0.1,
    ], [
        props.point.data.position[0] + 0.1,
        props.point.data.position[1] + 0.1,
    ]];
    let line2 = [[
        props.point.data.position[0] - 0.1,
        props.point.data.position[1] + 0.1,
    ], [
        props.point.data.position[0] + 0.1,
        props.point.data.position[1] - 0.1,
    ]];
    return (
        <LayerGroup>
            <Polyline color={props.point.data.color || "blue"} fillColor={props.point.data.color || "blue"} positions={line1}></Polyline>
            <Polyline color={props.point.data.color || "blue"} fillColor={props.point.data.color || "blue"} positions={line2}></Polyline>

            <Polygon positions={[line1[0], line2[0], line1[1], line2[1]]}
                     onMouseOver={(e) => e.target.openPopup()}
                     onMouseOut={(e) => e.target.closePopup()}
                     onClick={(e) => props.onClickItem && props.onClickItem(props.point)}
                     opacity={0}
                     fillOpacity={0}>
              {props.point.name &&
                <Popup>
                  <span className="title">{props.point.name}</span>
                </Popup>}
            </Polygon>
        </LayerGroup>
    )
}

CrossMarker.propTypes = {
    point: PropTypes.object.isRequired,
}
