import React from 'react';
import { connect } from 'react-redux'
import { Map, TileLayer, Polyline} from 'react-leaflet';
import {PropTypes} from "prop-types";
import ImmutablePropTypes from 'react-immutable-proptypes';
import "./MainMap.css";
import ArrowMarker from "./markers/ArrowMarker";
import PointMarker from "./markers/PointMarker";
import CrossMarker from "./markers/CrossMarker";
import PolygonMarker from "./markers/PolygonMarker";

function Point(props) {
  if (props.point.get('type') === "point") {
    return (
      <PointMarker selected={props.selected} point={props.point.toJS()} onClickItem={props.onClickItem}></PointMarker>
    )
  } else if (props.point.get('type') === "arrow") {
    return (
      <ArrowMarker selected={props.selected} point={props.point.toJS()} onClickItem={props.onClickItem}></ArrowMarker>
    );
  } else if (props.point.get('type') === "cross") {
    return (
      <CrossMarker selected={props.selected} point={props.point.toJS()} onClickItem={props.onClickItem}></CrossMarker>
    );
  } else if (props.point.get('type') === "polygon") {
    return (
      <PolygonMarker selected={props.selected} point={props.point.toJS()} onClickItem={props.onClickItem}></PolygonMarker>
    );
  }
  return null;
}
Point.propTypes = {
    point: ImmutablePropTypes.mapContains({}).isRequired,
    selected: PropTypes.bool
}

class MainMapImpl extends React.Component {
    constructor(props) {
        super(props);
        this.getPosition = this.getPosition.bind(this);
        this.click = this.click.bind(this);
        this.keyup = this.keyup.bind(this);
    }

    componentWillMount() {
        document.addEventListener("keyup", this.keyup);
    }

    componentWillUnmount() {
        document.removeEventListener("keyup", this.keyup);
    }

    getPosition(event) {
        this.props.onCursorMove(event.latlng.lat, event.latlng.lng);
    }

    click(event) {
        if (this.props.drawing.get('ready-to-edit')) {
            return false;
        }

        if (this.props.drawing.get('type') === "point") {
            this.props.onAddMarker(this.props.cursor.get(0), this.props.cursor.get(1));
        } else if (this.props.drawing.get('type') === "cross") {
            this.props.onAddCross(this.props.cursor.get(0), this.props.cursor.get(1));
        } else if (this.props.drawing.get('type') === "arrow") {
            this.props.onAddArrowPoint(this.props.cursor.get(0), this.props.cursor.get(1));
        } else if (this.props.drawing.get('type') === "polygon") {
            this.props.onAddPolygonPoint(this.props.cursor.get(0), this.props.cursor.get(1));
        }
    }

    keyup(event) {
        if (event.keyCode === 27) {
            this.props.onCancelDrawing();
        } else if (event.keyCode === 13 && this.props.drawing.get('type') === "polygon") {
            this.props.onConfirmPolygonDrawing();
        }
    }

    render() {
      let drawingType = this.props.drawing.get('type');
      let drawingPosition = this.props.drawing.get('position');
      let drawingIcon = this.props.drawing.get('icon');

      if (!this.props.project) {
          return <div></div>;
      }

      return (
        <Map center={this.props.project.get('center_point').toJS()}
             zoom={this.props.project.get('zoom')}
             className="MainMap"
             onMouseMove={this.getPosition}>
          {drawingType && !this.props.drawing.get('ready-to-edit') &&
            <div className={"cover " + (drawingType? "drawing-"+drawingType : "")}
                 onClick={this.click}></div>}
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {this.props.project.get('mapitems').map((point) => <Point selected={point.get('id') === this.props.selectedId} onClickItem={this.props.onClickItem} point={point} key={point.get('id')}></Point>)}
          {drawingType === "point" && drawingPosition &&
              <PointMarker point={{data: {position: drawingPosition.toJS(), icon: drawingIcon || "other"}}}></PointMarker>}
          {drawingType === "point" && !drawingPosition &&
              <PointMarker point={{data: {position: this.props.cursor.toJS(), icon: drawingIcon || "other"}}}></PointMarker>}
          {drawingType === "cross" && drawingPosition &&
              <CrossMarker point={{data: {position: drawingPosition.toJS()}}}></CrossMarker>}
          {drawingType === "cross" && !drawingPosition &&
              <CrossMarker point={{data: {position: this.props.cursor.toJS()}}}></CrossMarker>}
          {drawingType === "arrow" && this.props.drawing.get('points') && this.props.drawing.get('points').size === 1 &&
              <ArrowMarker point={{data: {origin: this.props.drawing.getIn(['points', 0]).toJS(), dest: this.props.cursor.toJS()}}}></ArrowMarker>}
          {drawingType === "arrow" && this.props.drawing.get('points') && this.props.drawing.get('points').size === 2 &&
              <ArrowMarker point={{data: {origin: this.props.drawing.getIn(['points', 0]).toJS(), dest: this.props.drawing.getIn(['points', 1]).toJS()}}}></ArrowMarker>}
          {drawingType === "polygon" && !this.props.drawing.get('ready-to-edit') && this.props.drawing.get('points') && this.props.drawing.get('points').size > 0 &&
              <Polyline positions={this.props.drawing.get('points').toJS().concat([this.props.cursor.toJS()])}></Polyline>}
          {drawingType === "polygon" && this.props.drawing.get('ready-to-edit') &&
              <PolygonMarker point={{data: {positions: this.props.drawing.get('points').toJS()}}}></PolygonMarker>}
        </Map>
      );
    }
}

MainMapImpl.propTypes = {
    cursor: ImmutablePropTypes.contains(
                0: PropTypes.number.isRequired,
                1: PropTypes.number.isRequired,
            ),
    selectedId: PropTypes.string,
    project: PropTypes.object,
    drawing: ImmutablePropTypes.mapContains({
                type: PropTypes.string,
                data: PropTypes.object,
            }),
    onAddMarker: PropTypes.func.isRequired,
    onAddCross: PropTypes.func.isRequired,
    onAddArrowPoint: PropTypes.func.isRequired,
    onAddPolygonPoint: PropTypes.func.isRequired,
    onCancelDrawing: PropTypes.func.isRequired,
    onConfirmPolygonDrawing: PropTypes.func.isRequired,
    onCursorMove: PropTypes.func.isRequired,
    onClickItem: PropTypes.func.isRequired,
}

const MainMap = connect(
    (state) => ({
        selectedId: state.getIn(['map', 'viewing', 'id']),
        drawing: state.getIn(['map', 'drawing']),
        cursor: state.getIn(['map', 'cursor']),
        project: state.get('current-project'),
    }),
    (dispatch) => ({
        onAddMarker: (lat, lng) => {
            dispatch({type: "ADD_MARKER", "payload": [lat, lng]});
        },
        onAddCross: (lat, lng) => {
            dispatch({type: "ADD_CROSS", "payload": [lat, lng]});
        },
        onAddArrowPoint: (lat, lng) => {
            dispatch({type: "ADD_ARROW_POINT", "payload": [lat, lng]});
        },
        onAddPolygonPoint: (lat, lng) => {
            dispatch({type: "ADD_POLYGON_POINT", "payload": [lat, lng]});
        },
        onCancelDrawing: () => {
            dispatch({type: "CANCEL_DRAWING", "payload": null});
        },
        onConfirmPolygonDrawing: () => {
            dispatch({type: "CONFIRM_POLYGON_DRAWING", "payload": null});
        },
        onCursorMove: (lat, lng) => {
            dispatch({type: "CURSOR_MOVE", "payload": [lat, lng]});
        },
        onClickItem: (point) => {
            dispatch({type: "VISUALIZE_MARKER", "payload": point});
        },
    })
)(MainMapImpl);

export default MainMap;
