import React from 'react';
import { LayerGroup, Polyline, Polygon, Popup } from 'react-leaflet';
import {PropTypes} from "prop-types";

export default function PolygonMarker(props) {
    return (
        <Polygon positions={[props.point.positions]}>
          <Popup>
            <h1>{props.point.name}</h1>
            {props.point.description &&
              <p>{props.point.description}</p>}
          </Popup>}
        </Polygon>
    )
}

PolygonMarker.propTypes = {
    point: PropTypes.object.isRequired,
}
