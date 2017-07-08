import React from 'react';
import { Marker, Popup} from 'react-leaflet';
import * as L from "leaflet";
import {PropTypes} from "prop-types";
import iconSvg from "./InfoMarker.svg";

export default function InfoMarker(props) {
    var icon = L.icon({
        iconUrl: 'images/info.svg',
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

InfoMarker.propTypes = {
    position: PropTypes.array.isRequired,
}
