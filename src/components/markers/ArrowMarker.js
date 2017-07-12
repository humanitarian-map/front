import React from 'react';
import { LayerGroup, Polyline, Popup, Polygon } from 'react-leaflet';
import * as Victor from "victor";
import {PropTypes} from "prop-types";
import {DEFAULT_COLOR} from "../../utils/colors";

export default function ArrowMarker(props) {
    let origin = Victor.fromArray(props.point.data.origin);
    let dest = Victor.fromArray(props.point.data.dest);
    let canonical = dest.clone().subtract(origin.clone());
    let arrow_point1 = canonical.clone().multiply(Victor.fromArray([-0.1, -0.1])).rotateDeg(25).add(dest.clone());
    let arrow_point2 = canonical.clone().multiply(Victor.fromArray([-0.1, -0.1])).rotateDeg(-25).add(dest.clone());

    return (
        <LayerGroup>
            <Polyline color={props.point.data.color || DEFAULT_COLOR} fillColor={props.point.data.color || DEFAULT_COLOR} positions={[props.point.data.origin, props.point.data.dest]}></Polyline>
            <Polyline color={props.point.data.color || DEFAULT_COLOR} fillColor={props.point.data.color || DEFAULT_COLOR} positions={[props.point.data.dest, arrow_point1.toArray()]}></Polyline>
            <Polyline color={props.point.data.color || DEFAULT_COLOR} fillColor={props.point.data.color || DEFAULT_COLOR} positions={[props.point.data.dest, arrow_point2.toArray()]}></Polyline>

            <Polygon positions={[props.point.data.dest, arrow_point2.toArray(), props.point.data.origin, arrow_point1.toArray()]}
                     onMouseOver={(e) => e.target.openPopup()}
                     onMouseOut={(e) => e.target.closePopup()}
                     onClick={(e) => props.onClickItem && props.onClickItem(props.point)}
                     opacity={0}
                     fillOpacity={0}>
              {props.point.name &&
                <Popup>
                  <span className="title">{props.point.name}</span>
                </Popup>}
            </Polygon>
        </LayerGroup>
    )
}

ArrowMarker.propTypes = {
    point: PropTypes.object.isRequired,
}
