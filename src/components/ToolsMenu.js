import React, { Component } from 'react';
import { connect } from 'react-redux'
import {PropTypes} from "prop-types";
import './ToolsMenu.css';
import {store} from "../App.store";
import * as actions from "../App.actions";

function CursorBox(props) {
    return (
      <div className="cursor-box">
        <span className="lat">{props.lat.toFixed(4)}</span>,
        <span className="lng">{props.lng.toFixed(4)}</span>
      </div>);
}

CursorBox.propTypes = {
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
}

class ToolsMenu extends Component {
    render() {
        let active = this.props.drawing.get('type');
        return (
          <div className="ToolsMenu">
            <div className={"marker mdi mdi-map-marker mdi-24px " + (active === 'point' ? 'active' : '')}
               onClick={() => store.dispatch(actions.selectTool('point'))}></div>
            <div className={"marker mdi mdi-arrow-top-right mdi-24px " + (active === 'arrow' ? 'active' : '')}
                 onClick={() => store.dispatch(actions.selectTool('arrow'))}></div>
            <div className={"marker mdi mdi-vector-triangle mdi-24px " + (active === 'polygon' ? 'active' : '')}
                 onClick={() => store.dispatch(actions.selectTool('polygon'))}></div>
            <div className={"marker mdi mdi-close mdi-24px " + (active === 'cross' ? 'active' : '')}
                 onClick={() => store.dispatch(actions.selectTool('cross'))}></div>
            <div className={"marker mdi mdi-cursor-move mdi-24px " + (this.props.moving ? 'active' : '')}
                 onClick={() => store.dispatch(actions.toggleMove())}></div>
            <CursorBox lat={this.props.cursor.get(0)} lng={this.props.cursor.get(1)}></CursorBox>
          </div>
        );
    }
}

ToolsMenu.propTypes = {
    drawing: PropTypes.object.isRequired
}

export default connect(
    (state) => ({
        drawing: state.getIn(['map', 'drawing']),
        cursor: state.getIn(['map', 'cursor']),
        moving: state.getIn(['map', 'moving']),
    }),
)(ToolsMenu);
