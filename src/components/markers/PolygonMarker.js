import React from 'react';
import { Polygon, Popup } from 'react-leaflet';
import {PropTypes} from "prop-types";

export default function PolygonMarker(props) {
    return (
        <Polygon positions={[props.point.positions]}
                 onMouseOver={(e) => e.target.openPopup()}
                 onMouseOut={(e) => e.target.closePopup()}>
          <Popup>
            <div>
              <span className="title">{props.point.name}</span>
              {props.point.description &&
                <p>{props.point.description}</p>}
            </div>
          </Popup>}
        </Polygon>
    )
}

PolygonMarker.propTypes = {
    point: PropTypes.object.isRequired,
}
