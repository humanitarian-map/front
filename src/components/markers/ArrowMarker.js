import React from 'react';
import { LayerGroup, Polyline, Popup } from 'react-leaflet';
import * as Victor from "victor";
import {PropTypes} from "prop-types";

export default function ArrowMarker(props) {
    let origin = Victor.fromArray(props.point.origin);
    let dest = Victor.fromArray(props.point.dest);
    let canonical = dest.clone().subtract(origin.clone());
    let arrow_point1 = canonical.clone().multiply(Victor.fromArray([-0.1, -0.1])).rotateDeg(25).add(dest.clone());
    let arrow_point2 = canonical.clone().multiply(Victor.fromArray([-0.1, -0.1])).rotateDeg(-25).add(dest.clone());

    return (
        <LayerGroup>
            <Polyline positions={[props.point.origin, props.point.dest]}>
              {props.children &&
                <Popup>
                  {props.children}
                </Popup>}
            </Polyline>
            <Polyline positions={[props.point.dest, arrow_point1.toArray()]}></Polyline>
            <Polyline positions={[props.point.dest, arrow_point2.toArray()]}></Polyline>
        </LayerGroup>
    )
}

ArrowMarker.propTypes = {
    point: PropTypes.object.isRequired,
}
