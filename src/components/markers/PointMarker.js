import React from 'react';
import { Marker, Popup} from 'react-leaflet';
import * as L from "leaflet";
import {PropTypes} from "prop-types";
import "./PointMarker.css";
import {POINT_TYPES_OBJ} from "../../utils/point_types";

function createIcon(markerId, active) {
    let iconName = POINT_TYPES_OBJ[markerId].icon;
    return L.divIcon({
        className: "marker-icon "+ markerId + "-icon mdi mdi-" + iconName + " mdi-24px" + (active? " active": ""),
        iconSize: [40, 40],
        html: "<div class='arrow'></div>",
        iconAnchor: [20, 44],
        popupAnchor: [0, -40],
    })
}

const icons = {
    "warning": createIcon("warning", false),
    "camp": createIcon("camp", false),
    "checkpoint": createIcon("checkpoint", false),
    "hospital": createIcon("hospital", false),
    "idps": createIcon("idps", false),
    "mobile-clinic": createIcon("mobile-clinic", false),
    "other": createIcon("other", false),
    "warning-active": createIcon("warning", true),
    "camp-active": createIcon("camp", true),
    "checkpoint-active": createIcon("checkpoint", true),
    "hospital-active": createIcon("hospital", true),
    "idps-active": createIcon("idps", true),
    "mobile-clinic-active": createIcon("mobile-clinic", true),
    "other-active": createIcon("other", true),
}

export default function PointMarker(props) {
    return (
        <Marker
            className="PointMarker"
            draggable={props.draggable}
            onDragEnd={(e) => props.onMoveMarker(props.point, e.target.getLatLng())}
            position={props.point.data.position}
            icon={props.selected? icons[(props.point.data.icon || "other") + "-active"] : icons[props.point.data.icon || "other"]}
            onMouseOver={(e) => e.target.openPopup()}
            onMouseOut={(e) => e.target.closePopup()}
            onClick={(e) => props.onClickItem && props.onClickItem(props.point)}>
          {props.point.name &&
            <Popup>
              <span className="title">{props.point.name}</span>
            </Popup>}
        </Marker>
    )
}

PointMarker.propTypes = {
    point: PropTypes.object.isRequired,
    selected: PropTypes.bool,
    onMove: PropTypes.func,
    onClickItem: PropTypes.func,
    draggable: PropTypes.bool
}
