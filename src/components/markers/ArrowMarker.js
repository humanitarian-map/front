import React from 'react';
import { LayerGroup, Polyline, Tooltip, Polygon } from 'react-leaflet';
import * as Victor from "victor";
import {PropTypes} from "prop-types";
import {DEFAULT_COLOR} from "../../utils/colors";
import {DEFAULT_ARROWHEAD_SIZE} from "../../utils/sizes";
import {emit} from "../../App.events";
import * as actions from "../../App.actions";

export default function ArrowMarker(props) {
    let arrowhead_multiplier = (props.point.data.size || DEFAULT_ARROWHEAD_SIZE) / 100
    let origin = Victor.fromArray(props.point.data.origin);
    let dest = Victor.fromArray(props.point.data.dest);
    let canonical = dest.clone().subtract(origin.clone());
    let arrow_point1 = canonical.clone().multiply(Victor.fromArray([-arrowhead_multiplier, -arrowhead_multiplier])).rotateDeg(25).add(dest.clone());
    let arrow_point2 = canonical.clone().multiply(Victor.fromArray([-arrowhead_multiplier, -arrowhead_multiplier])).rotateDeg(-25).add(dest.clone());

    return (
        <LayerGroup>
            <Polyline color={props.point.data.color || DEFAULT_COLOR} fillColor={props.point.data.color || DEFAULT_COLOR} positions={[props.point.data.origin, props.point.data.dest]}></Polyline>
            <Polyline color={props.point.data.color || DEFAULT_COLOR} fillColor={props.point.data.color || DEFAULT_COLOR} positions={[props.point.data.dest, arrow_point1.toArray()]}></Polyline>
            <Polyline color={props.point.data.color || DEFAULT_COLOR} fillColor={props.point.data.color || DEFAULT_COLOR} positions={[props.point.data.dest, arrow_point2.toArray()]}></Polyline>

            <Polygon positions={[props.point.data.dest, arrow_point2.toArray(), props.point.data.origin, arrow_point1.toArray()]}
                     onClick={(e) => emit(actions.clickItem(props.point))}
                     opacity={0}
                     fillOpacity={0}>
              {props.point.name &&
                <Tooltip direction="top" sticky={true} offset={[-13, -20]}>
                  <span className="title">{props.point.name}</span>
                </Tooltip>}
            </Polygon>
        </LayerGroup>
    )
}

ArrowMarker.propTypes = {
    point: PropTypes.object.isRequired,
}
