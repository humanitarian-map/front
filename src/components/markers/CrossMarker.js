import React from 'react';
import { Marker, Popup} from 'react-leaflet';
import * as L from "leaflet";
import {PropTypes} from "prop-types";
import iconSvg from "./CrossMarker.svg";

export default function CrossMarker(props) {
    var icon = L.icon({
        iconUrl: iconSvg,
        iconSize: [64, 64],
        iconAnchor: [32, 32],
        popupAnchor: [0, -24],
    });

    return (
        <Marker position={props.position} icon={icon}>
          {props.children &&
            <Popup>
              {props.children}
            </Popup>}
        </Marker>
    )
}

CrossMarker.propTypes = {
    position: PropTypes.array.isRequired,
}
