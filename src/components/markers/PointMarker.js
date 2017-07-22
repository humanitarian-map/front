import React from 'react';
import { Marker, Tooltip} from 'react-leaflet';
import * as L from "leaflet";
import {PropTypes} from "prop-types";
import "./PointMarker.css";
import {POINT_TYPES_OBJ} from "../../utils/point_types";
import {emit} from "../../App.events";
import * as actions from "../../App.actions";

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
            onClick={(e) => emit(actions.clickItem(props.point))}>
          {props.point.name &&
            <Tooltip direction="top" offset={[-15, -60]}>
              <span className="title">{props.point.name}</span>
            </Tooltip>}
        </Marker>
    )
}

PointMarker.propTypes = {
    point: PropTypes.object.isRequired,
    selected: PropTypes.bool,
    onMove: PropTypes.func,
    draggable: PropTypes.bool
}
