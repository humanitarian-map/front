import React from 'react';
import { Polygon, Tooltip} from 'react-leaflet';
import {PropTypes} from "prop-types";
import {DEFAULT_COLOR} from "../../utils/colors";

export default function PolygonMarker(props) {
    return (
        <Polygon positions={[props.point.data.positions]}
                 color={props.point.data.color || DEFAULT_COLOR}
                 fillColor={props.point.data.color || DEFAULT_COLOR}
                 onClick={(e) => props.onClickItem && props.onClickItem(props.point)}>
          {props.point.name &&
            <Tooltip direction="top" sticky={true} offset={[-13, -20]}>
              <span className="title">{props.point.name}</span>
            </Tooltip>}
        </Polygon>
    )
}

PolygonMarker.propTypes = {
    point: PropTypes.object.isRequired,
}
