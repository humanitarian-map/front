import React from 'react';
import { Polygon, Tooltip} from 'react-leaflet';
import {PropTypes} from "prop-types";
import {DEFAULT_COLOR} from "../../utils/colors";
import {store} from "../../App.store";
import * as actions from "../../App.actions";

export default function PolygonMarker(props) {
    let data;
    if (typeof props.point.Data === 'string') {
        data = JSON.parse(props.point.Data);
    } else {
        data = props.point.Data;
    }
    return (
        <Polygon positions={[data.positions]}
                 color={data.color || DEFAULT_COLOR}
                 fillColor={data.color || DEFAULT_COLOR}
                 onClick={(e) => store.dispatch(actions.clickItem(props.point))}>
          {props.point.Name &&
            <Tooltip direction="top" sticky={true} offset={[-13, -20]}>
              <span className="title">{props.point.Name}</span>
            </Tooltip>}
        </Polygon>
    )
}

PolygonMarker.propTypes = {
    point: PropTypes.object.isRequired,
}
