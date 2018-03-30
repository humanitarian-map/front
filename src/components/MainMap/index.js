import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../App.actions';

import MainMap from './MainMap.js';

export default connect(
    (state) => ({
        cursor: state.getIn(['map', 'cursor']),
        selectedId: state.getIn(['map', 'viewing', 'id']),
        project: state.get('current-project'),
        points: state.get('current-project-points'),
        moving: state.getIn(['map', 'moving']),
        drawing: state.getIn(['map', 'drawing']),
    }),
    (dispatch) => ({
        actions: bindActionCreators({
            cursorMove: actions.cursorMove,
            addMarker: actions.addMarker,
            moveMarker: actions.moveMarker,
            addCross: actions.addCross,
            addArrowPoint: actions.addArrowPoint,
            addPolygonPoint: actions.addPolygonPoint,
            cancelDrawing: actions.cancelDrawing,
            cancelViewing: actions.cancelViewing,
            deleteItem: actions.deleteItem,
            setCurrentMapPosition: actions.setCurrentMapPosition,
            confirmPolygonDrawing: actions.confirmPolygonDrawing,
        }, dispatch),
    })
)(MainMap);
