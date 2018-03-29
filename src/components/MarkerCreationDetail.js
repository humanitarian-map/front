import React from 'react';
import { connect } from 'react-redux'
import {PropTypes} from "prop-types";
import './MarkerCreationDetail.css';
import {COLORS, DEFAULT_COLOR} from "../utils/colors";
import {DEFAULT_CROSS_SIZE, DEFAULT_ARROWHEAD_SIZE} from "../utils/sizes";
import {POINT_TYPES} from "../utils/point_types";
import {store} from "../App.store";
import * as actions from "../App.actions";

function MarkerIcon(props) {
    return (
        <div className={"MarkerIcon " + (props.active? "active" : "")} onClick={props.onClick}>
          <div className={"marker-icon " + props.type.id + "-icon mdi mdi-" + props.type.icon + " mdi-18px"}  />
          <span>{props.type.name}</span>
        </div>
    )
}

class MarkerCreationDetail extends React.Component {
    static propTypes = {
        drawing: PropTypes.object.isRequired,
        project: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            "name": "",
            "description": ""
        }
    }

    addPoint = (event) => {
        event.preventDefault();
        let data = {};
        if (this.props.drawing.get('type') === "point") {
            data = {
                position: this.props.drawing.get('position').toJS(),
                icon: this.props.drawing.get('icon'),
            }
        } else if (this.props.drawing.get('type') === "cross") {
            data = {
                position: this.props.drawing.get('position').toJS(),
                color: this.props.drawing.get('color'),
                size: this.props.drawing.get('size'),
            }
        } else if (this.props.drawing.get('type') === "polygon") {
            data = {
                positions: this.props.drawing.get('points').toJS(),
                color: this.props.drawing.get('color'),
            }
        } else if (this.props.drawing.get('type') === "arrow") {
            data = {
                origin: this.props.drawing.getIn(['points', 0]).toJS(),
                dest: this.props.drawing.getIn(['points', 1]).toJS(),
                color: this.props.drawing.get('color'),
                size: this.props.drawing.get('size'),
            }
        }
        store.dispatch(actions.saveMarker(
            this.props.project.get('Slug'),
            {
                "project": this.props.project.get('ID'),
                "name": this.state.name,
                "description": this.state.description,
                "type": this.props.drawing.get('type'),
                "data": data
            }
        ));
    }

    render() {
        let props = this.props
        let activeMarker = props.drawing.get('icon');
        let type = this.props.drawing.get('type');

        return (
          <section className="MarkerCreationDetail panel">
            <h2 className="header-title">
              {type === "point" && "Marker"}
              {type === "arrow" && "Arrow"}
              {type === "polygon" && "Polygon"}
              {type === "cross" && "Cross"}
            </h2>
            <div className="content">
              <div className="block">
                <input placeholder="Write a title" type="text" onChange={(event) => this.setState({name: event.target.value})}/>
              </div>
              {type === "point" &&
                <div className="block">
                  <h3 className="title mdi mdi-bookmark mdi-16px">Category</h3>
                  <div className="markers">
                    {POINT_TYPES.map((pointType) => (
                        <MarkerIcon active={activeMarker === pointType.id || (!activeMarker && pointType.id === "other") }
                                    onClick={() => store.dispatch(actions.selectIcon(pointType.id))}
                                    type={pointType}
                                    key={pointType.id} />
                    ))}
                  </div>
                </div>}
              {(type === "polygon" || type === "arrow" || type === "cross") &&
                <div className="block">
                  <h3 className="title mdi mdi-comment mdi-16px">Color</h3>
                  <div className="color-block">
                    {COLORS.map((color) => (
                      <div key={color}
                           style={{background: color}}
                           className={(this.props.drawing.get('color') || DEFAULT_COLOR) === color? "selected": ""}
                           onClick={() => store.dispatch(actions.setDrawingColor(color))}>
                      </div>
                    ))}
                  </div>
                </div>}

              {(type === "cross") &&
                <div className="block">
                  <h3 className="title mdi mdi-comment mdi-16px">Size</h3>
                  <input type="number" placeholder="Size"
                         value={props.drawing.getIn(['size']) || DEFAULT_CROSS_SIZE}
                         onChange={(e) => store.dispatch(actions.changeCrossSize(parseFloat(parseFloat(e.target.value))))} />
                </div>}

              {(type === "arrow") &&
                <div className="block">
                  <h3 className="title mdi mdi-comment mdi-16px">Arrowhead Size (%)</h3>
                  <input type="number" placeholder="Size"
                         value={props.drawing.getIn(['size']) || DEFAULT_ARROWHEAD_SIZE}
                         onChange={(e) => store.dispatch(actions.changeCrossSize(parseFloat(parseFloat(e.target.value))))} />
                </div>}

              <div className="block">
                <h3 className="title mdi mdi-comment mdi-16px">Comment</h3>
                <textarea placeholder="Write a comment" onChange={(event) => this.setState({description: event.target.value})}>
                </textarea>
              </div>
              <div className="block">
                <h3 className="title mdi mdi-map mdi-16px">Coordinates</h3>
                {(type === "point" || type === "cross") &&
                  <div className="coordinates-inputs point cross">
                    <div>
                      <span>Latitude</span>
                      <input placeholder="Lat"
                             type="number"
                             value={props.drawing.getIn(['position', 0])}
                             onChange={(e) => store.dispatch(actions.changeLocation(parseFloat(parseFloat(e.target.value)), props.drawing.getIn(['position', 1])))} />
                    </div>
                    <div>
                      <span>Longitude</span>
                      <input placeholder="Lng"
                             type="number"
                             value={props.drawing.getIn(['position', 1])}
                             onChange={(e) => store.dispatch(actions.changeLocation(props.drawing.getIn(['position', 0]), parseFloat(parseFloat(e.target.value))))} />
                    </div>
                  </div>}
                {(type === "arrow") &&
                  <div className="coordinates-inputs arrow">
                    <span>Origin:</span>
                    <div>
                      <input placeholder="Lat"
                             type="number"
                             value={props.drawing.getIn(['points', 0, 0])}
                             onChange={(e) => store.dispatch(actions.changeArrowOrigin(parseFloat(parseFloat(e.target.value)), props.drawing.getIn(['points', 0, 1])))} />
                      <input placeholder="Lng"
                             type="number"
                             value={props.drawing.getIn(['points', 0, 1])}
                             onChange={(e) => store.dispatch(actions.changeArrowOrigin(props.drawing.getIn(['points', 0, 0]), parseFloat(parseFloat(e.target.value))))} />
                    </div>
                    <span>Destination:</span>
                    <div>
                      <input placeholder="Lat"
                             type="number"
                             value={props.drawing.getIn(['points', 1, 0])}
                             onChange={(e) => store.dispatch(actions.changeArrowDest(parseFloat(parseFloat(e.target.value)), props.drawing.getIn(['points', 1, 1])))} />
                      <input placeholder="Lng"
                             type="number"
                             value={props.drawing.getIn(['points', 1, 1])}
                             onChange={(e) => store.dispatch(actions.changeArrowDest(props.drawing.getIn(['points', 1, 0]), parseFloat(parseFloat(e.target.value))))} />
                    </div>
                  </div>}
                {(type === "polygon") &&
                  <div className="coordinates-inputs polygon">
                    {props.drawing.get('points').map((point, idx) => (
                      <div className="point" key={idx}>
                        <span>Latitude</span>
                        <input placeholder="Lat"
                               type="number"
                               value={point.get(0)}
                               onChange={(e) => store.dispatch(actions.changePolygonPoint(idx, parseFloat(parseFloat(e.target.value)), point.get(1)))} />
                        <span>Longitude</span>
                        <input placeholder="Lng"
                               type="number"
                               value={point.get(1)}
                               onChange={(e) => store.dispatch(actions.changePolygonPoint(idx, point.get(0), parseFloat(parseFloat(e.target.value))))} />
                      </div>))}
                  </div>}
              </div>
            </div>
            <div className="buttons-set">
              <button className="save" onClick={this.addPoint}>Save</button>
              <button className="cancel" onClick={() => store.dispatch(actions.cancelDrawing())}>Cancel</button>
            </div>
          </section>
        );
    }
}

export default connect(
    (state) => ({
        drawing: state.getIn(['map', 'drawing']),
        project: state.get("current-project"),
    }),
)(MarkerCreationDetail);
