import React from 'react';
import { Marker, Popup} from 'react-leaflet';
import * as L from "leaflet";
import {PropTypes} from "prop-types";
import iconSvg from "./House2Marker.svg";

export default function House2Marker(props) {
    var icon = L.icon({
        iconUrl: iconSvg,
        iconSize: [48, 48],
        iconAnchor: [24, 24],
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

House2Marker.propTypes = {
    position: PropTypes.array.isRequired,
}
