import React, { Component } from 'react';
import { connect } from 'react-redux'
import {PropTypes} from "prop-types";
import {Link} from "react-router-dom";
import './ToolsMenu.css';

class ToolsMenuImpl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayMarkers: false
        }
    }

    render() {
        return (
          <div className="ToolsMenu">
            <div className="marker mdi mdi-map-marker mdi-36px"
               onClick={() => this.props.selectTool('point')}></div>
            <div className="marker mdi mdi-arrow-up mdi-36px"
                 onClick={() => this.props.selectTool('arrow')}></div>
            <div className="marker mdi mdi-vector-square mdi-36px"
                 onClick={() => this.props.selectTool('polygon')}></div>
          </div>
        );
    }
}

ToolsMenuImpl.propTypes = {
    user: PropTypes.object.isRequired
}

const ToolsMenu = connect(
    (state) => ({
        user: state.get('user')
    }),
    (dispatch) => ({
        selectTool: (tool) => {
            dispatch({type: "SELECT_TOOL", "payload": tool});
        }
    })
)(ToolsMenuImpl);

export default ToolsMenu;
