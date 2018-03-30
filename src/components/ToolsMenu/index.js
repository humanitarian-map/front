import * as actions from '../../App.actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ToolsMenu from './ToolsMenu.js';

export default connect(
    (state) => ({
        drawing: state.getIn(['map', 'drawing']),
        cursor: state.getIn(['map', 'cursor']),
        moving: state.getIn(['map', 'moving']),
    }),
    (dispatch, getState) => ({
        actions: bindActionCreators({
            selectTool: actions.selectTool,
            toggleMove: actions.toggleMove,
        }, dispatch),
    })
)(ToolsMenu);
