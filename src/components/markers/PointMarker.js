import React from 'react';
import { Marker, Popup} from 'react-leaflet';
import * as L from "leaflet";
import {PropTypes} from "prop-types";
import "./PointMarker.css";

function createIcon(markerId, iconName, active) {
    return L.divIcon({
        className: "marker-icon " + markerId + "-icon mdi mdi-" + iconName + " mdi-24px" + (active? " active": ""),
        iconSize: [40, 40],
        html: "<div class='arrow'></div>",
        iconAnchor: [20, 44],
        popupAnchor: [0, -40],
    })
}

const icons = {
    "warning": createIcon("warning", "fire", false),
    "camp": createIcon("camp", "tent", false),
    "checkpoint": createIcon("checkpoint", "marker-check", false),
    "hospital": createIcon("hospital", "hospital", false),
    "idps": createIcon("idps", "walk", false),
    "mobile-clinic": createIcon("mobile-clinic", "truck", false),
    "other": createIcon("other", "map-marker", false),
    "warning-active": createIcon("warning", "fire", true),
    "camp-active": createIcon("camp", "tent", true),
    "checkpoint-active": createIcon("checkpoint", "marker-check", true),
    "hospital-active": createIcon("hospital", "hospital", true),
    "idps-active": createIcon("idps", "walk", true),
    "mobile-clinic-active": createIcon("mobile-clinic", "truck", true),
    "other-active": createIcon("other", "map-marker", true),
}

export default function PointMarker(props) {
    return (
        <Marker
            className="PointMarker"
            position={props.point.data.position}
            icon={props.selected? icons[(props.point.data.icon || "other") + "-active"] : icons[props.point.data.icon || "other"]}
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
    selected: PropTypes.bool,
}
