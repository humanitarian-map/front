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
import {DEFAULT_COLOR} from "../utils/colors";
import {DEFAULT_CROSS_SIZE, DEFAULT_ARROWHEAD_SIZE} from "../utils/sizes";
import {store} from "../App.store";
import * as actions from "../App.actions";

function Point(props) {
  if (props.point.get('type') === "point") {
    return (
      <PointMarker selected={props.selected}
                   point={props.point.toJS()}
                   draggable={props.draggable}
                   onMoveMarker={props.onMoveMarker}></PointMarker>
    )
  } else if (props.point.get('type') === "arrow") {
    return (
      <ArrowMarker selected={props.selected} point={props.point.toJS()}></ArrowMarker>
    );
  } else if (props.point.get('type') === "cross") {
    return (
      <CrossMarker selected={props.selected} point={props.point.toJS()}></CrossMarker>
    );
  } else if (props.point.get('type') === "polygon") {
    return (
      <PolygonMarker selected={props.selected} point={props.point.toJS()}></PolygonMarker>
    );
  }
  return null;
}
Point.propTypes = {
    point: ImmutablePropTypes.mapContains({}).isRequired,
    selected: PropTypes.bool,
    draggable: PropTypes.bool
}

class MainMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {pointer: [0, 0]}
        this.getPosition = this.getPosition.bind(this);
        this.click = this.click.bind(this);
        this.keyup = this.keyup.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
        this.centerMap = this.centerMap.bind(this);
        this.whenReady = this.whenReady.bind(this);
    }

    componentWillMount() {
        document.addEventListener("keyup", this.keyup);
        document.addEventListener("mousemove", this.mouseMove);
        document.addEventListener("centerMap", this.centerMap);
    }

    componentWillUnmount() {
        document.removeEventListener("keyup", this.keyup);
        document.removeEventListener("mousemove", this.mouseMove);
        document.addEventListener("centerMap", this.centerMap);
    }

    centerMap(event) {
        this.map.invalidateSize();
        setTimeout(() => this.map.flyTo(event.detail.center, event.detail.zoom, 100));
    }

    getPosition(event) {
        store.dispatch(actions.cursorMove(event.latlng.lat, event.latlng.lng));
    }

    click(event) {
        if (this.props.drawing.get('ready-to-edit')) {
            return false;
        }

        if (this.props.drawing.get('type') === "point") {
            store.dispatch(actions.addMarker(this.props.cursor.get(0), this.props.cursor.get(1)));
        } else if (this.props.drawing.get('type') === "cross") {
            store.dispatch(actions.addCross(this.props.cursor.get(0), this.props.cursor.get(1)));
        } else if (this.props.drawing.get('type') === "arrow") {
            store.dispatch(actions.addArrowPoint(this.props.cursor.get(0), this.props.cursor.get(1)));
        } else if (this.props.drawing.get('type') === "polygon") {
            store.dispatch(actions.addPolygonPoint(this.props.cursor.get(0), this.props.cursor.get(1)));
        }
    }

    keyup(event) {
        if (event.keyCode === 27) {
            store.dispatch(actions.cancelDrawing());
            store.dispatch(actions.cancelViewing());
        } else if (event.keyCode === 13 && this.props.drawing.get('type') === "polygon") {
            store.dispatch(actions.confirmPolygonDrawing());
        } else if (event.keyCode === 46 && this.props.selectedId) {
            store.dispatch(actions.deleteItem(this.props.project.get('Slug'), this.props.selectedId));
        }
    }

    mouseMove(event) {
        this.setState({pointer: [event.clientX - 60, event.clientY - 60]})
    }

    whenReady(event) {
        this.map = event.target;
        store.dispatch(actions.setCurrentMapPosition(this.map.getCenter(), this.map.getZoom()))
    }


    render() {
      let drawingType = this.props.drawing.get('type');
      let drawingPosition = this.props.drawing.get('position');
      let drawingIcon = this.props.drawing.get('icon');

      if (!this.props.project) {
          return <div></div>;
      }

      return (
        <Map center={[this.props.project.get('CenterPointX'), this.props.project.get('CenterPointY')]}
             zoom={this.props.project.get('Zoom')}
             className="MainMap"
             whenReady={this.whenReady}
             onMouseMove={this.getPosition}
             onViewportChange={({center, zoom}) => store.dispatch(actions.setCurrentMapPosition({lat: center[0], lng: center[1]}, zoom))}>
          {drawingType && !this.props.drawing.get('ready-to-edit') &&
            <div className={"cover " + (drawingType? "drawing-"+drawingType : "")}
                 onClick={this.click}></div>}
          <TileLayer
            url='http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
            subdomains='abcd'
            maxZoom='19'
            minZoom='3'
          />

          {false && this.props.project.get('Mapitems').map((point) => (
              <Point selected={point.get('id') === this.props.selectedId}
                     onMoveMarker={(point, latlng) => store.dispatch(actions.moveMarker(this.props.project.get('Slug'), point, latlng))}
                     draggable={this.props.moving}
                     point={point}
                     key={point.get('id')}>
              </Point>
          ))}
          {drawingType === "point" && drawingPosition &&
              <PointMarker point={{data: {position: drawingPosition.toJS(), icon: drawingIcon || "other"}}}></PointMarker>}
          {drawingType === "point" && !drawingPosition &&
              <PointMarker point={{data: {position: this.props.cursor.toJS(), icon: drawingIcon || "other"}}}></PointMarker>}
          {drawingType === "cross" && drawingPosition &&
              <CrossMarker point={{data: {size: this.props.drawing.get('size') || DEFAULT_CROSS_SIZE, color: this.props.drawing.get('color') || DEFAULT_COLOR, position: drawingPosition.toJS()}}}></CrossMarker>}
          {drawingType === "cross" && !drawingPosition &&
              <CrossMarker point={{data: {size: this.props.drawing.get('size') || DEFAULT_CROSS_SIZE, position: this.props.cursor.toJS()}}}></CrossMarker>}
          {drawingType === "arrow" && this.props.drawing.get('points') && this.props.drawing.get('points').size === 1 &&
              <ArrowMarker point={{data: {size: this.props.drawing.get('size') || DEFAULT_ARROWHEAD_SIZE, color: this.props.drawing.get('color') || DEFAULT_COLOR, origin: this.props.drawing.getIn(['points', 0]).toJS(), dest: this.props.cursor.toJS()}}}></ArrowMarker>}
          {drawingType === "arrow" && this.props.drawing.get('points') && this.props.drawing.get('points').size === 2 &&
              <ArrowMarker point={{data: {size: this.props.drawing.get('size') || DEFAULT_ARROWHEAD_SIZE, color: this.props.drawing.get('color') || DEFAULT_COLOR, origin: this.props.drawing.getIn(['points', 0]).toJS(), dest: this.props.drawing.getIn(['points', 1]).toJS()}}}></ArrowMarker>}
          {drawingType === "polygon" && !this.props.drawing.get('ready-to-edit') && this.props.drawing.get('points') && this.props.drawing.get('points').size > 0 &&
              <Polyline color={DEFAULT_COLOR} colorFill={DEFAULT_COLOR} positions={this.props.drawing.get('points').toJS().concat([this.props.cursor.toJS()])}></Polyline>}
          {drawingType === "polygon" && !this.props.drawing.get('ready-to-edit') && this.props.drawing.get('points') && this.props.drawing.get('points').size > 1 &&
              <div className="close-polygon-tooltip" style={{left: this.state.pointer[0] + 20, top: this.state.pointer[1] - 60}}>Press Enter to complete</div>}
          {drawingType === "polygon" && this.props.drawing.get('ready-to-edit') &&
              <PolygonMarker point={{data: {color: this.props.drawing.get('color') || DEFAULT_COLOR, positions: this.props.drawing.get('points').toJS()}}}></PolygonMarker>}
        </Map>
      );
    }
}

MainMap.propTypes = {
    cursor: ImmutablePropTypes.contains(
                0: PropTypes.number.isRequired,
                1: PropTypes.number.isRequired,
            ),
    selectedId: PropTypes.string,
    project: PropTypes.object,
    moving: PropTypes.bool,
    drawing: ImmutablePropTypes.mapContains({
                type: PropTypes.string,
                data: PropTypes.object,
            }),
}

export default connect(
    (state) => ({
        cursor: state.getIn(['map', 'cursor']),
        selectedId: state.getIn(['map', 'viewing', 'id']),
        project: state.get('current-project'),
        mapItems: state.get('current-project-items'),
        moving: state.getIn(['map', 'moving']),
        drawing: state.getIn(['map', 'drawing']),
    })
)(MainMap);
