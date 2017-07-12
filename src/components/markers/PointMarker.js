import React from 'react';
import { Marker, Popup} from 'react-leaflet';
import * as L from "leaflet";
import {PropTypes} from "prop-types";
import "./PointMarker.css";

function createIcon(markerId, iconName) {
    return L.divIcon({
        className: "marker-icon " + markerId + "-icon mdi mdi-" + iconName + " mdi-24px",
        iconSize: [40, 40],
        html: "<div class='arrow'></div>",
        iconAnchor: [20, 44],
        popupAnchor: [0, -40],
    })
}

const icons = {
    "warning": createIcon("warning", "fire"),
    "camp": createIcon("camp", "tent"),
    "checkpoint": createIcon("checkpoint", "marker-check"),
    "hospital": createIcon("hospital", "hospital"),
    "idps": createIcon("idps", "walk"),
    "mobile-clinic": createIcon("mobile-clinic", "truck"),
    "other": createIcon("other", "map-marker"),
}

export default function PointMarker(props) {
    return (
        <Marker
            className="PointMarker"
            position={props.point.data.position}
            icon={icons[props.point.data.icon || "other"]}
            onMouseOver={(e) => e.target.openPopup()}
            onMouseOut={(e) => e.target.closePopup()}
            onClick={(e) => props.onClickMarker && props.onClickMarker(props.point)}>
          <Popup>
            <span className="title">{props.point.name}</span>
          </Popup>
        </Marker>
    )
}

PointMarker.propTypes = {
    point: PropTypes.object.isRequired,
}
