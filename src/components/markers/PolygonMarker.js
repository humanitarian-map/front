import React from 'react';
import { Polygon, Popup } from 'react-leaflet';
import {PropTypes} from "prop-types";

export default function PolygonMarker(props) {
    return (
        <Polygon positions={[props.point.positions]}
                 onMouseOver={(e) => e.target.openPopup()}
                 onMouseOut={(e) => e.target.closePopup()}>
          <Popup>
            <span className="title">{props.point.name}</span>
          </Popup>}
        </Polygon>
    )
}

PolygonMarker.propTypes = {
    point: PropTypes.object.isRequired,
}
