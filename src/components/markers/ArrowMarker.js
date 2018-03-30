import React from 'react';
import { LayerGroup, Polyline, Tooltip, Polygon } from 'react-leaflet';
import * as Victor from "victor";
import {PropTypes} from "prop-types";
import {DEFAULT_COLOR} from "../../utils/colors";
import {DEFAULT_ARROWHEAD_SIZE} from "../../utils/sizes";
import {store} from "../../App.store";
import * as actions from "../../App.actions";

export default function ArrowMarker(props) {
    let data;
    if (typeof props.point.Data === 'string') {
        data = JSON.parse(props.point.Data);
    } else {
        data = props.point.Data;
    }
    let arrowhead_multiplier = (data.size || DEFAULT_ARROWHEAD_SIZE) / 100
    let origin = Victor.fromArray(data.origin);
    let dest = Victor.fromArray(data.dest);
    let canonical = dest.clone().subtract(origin.clone());
    let arrow_point1 = canonical.clone().multiply(Victor.fromArray([-arrowhead_multiplier, -arrowhead_multiplier])).rotateDeg(25).add(dest.clone());
    let arrow_point2 = canonical.clone().multiply(Victor.fromArray([-arrowhead_multiplier, -arrowhead_multiplier])).rotateDeg(-25).add(dest.clone());

    return (
        <LayerGroup>
            <Polyline color={data.color || DEFAULT_COLOR} fillColor={data.color || DEFAULT_COLOR} positions={[data.origin, data.dest]}></Polyline>
            <Polyline color={data.color || DEFAULT_COLOR} fillColor={data.color || DEFAULT_COLOR} positions={[data.dest, arrow_point1.toArray()]}></Polyline>
            <Polyline color={data.color || DEFAULT_COLOR} fillColor={data.color || DEFAULT_COLOR} positions={[data.dest, arrow_point2.toArray()]}></Polyline>

            <Polygon positions={[data.dest, arrow_point2.toArray(), data.origin, arrow_point1.toArray()]}
                     onClick={(e) => store.dispatch(actions.clickItem(props.point))}
                     opacity={0}
                     fillOpacity={0}>
              {props.point.Name &&
                <Tooltip direction="top" sticky={true} offset={[-13, -20]}>
                  <span className="title">{props.point.Name}</span>
                </Tooltip>}
            </Polygon>
        </LayerGroup>
    )
}

ArrowMarker.propTypes = {
    point: PropTypes.object.isRequired,
}
