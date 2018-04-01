import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../App.actions';

import MarkerCreationDetail from './MarkerCreationDetail.js';

export default connect(
    (state) => ({
        drawing: state.getIn(['map', 'drawing']),
        project: state.get('currentProject'),
    }),
    (dispatch) => ({
        actions: bindActionCreators({
            saveMarker: actions.saveMarker,
            selectIcon: actions.selectIcon,
            setDrawingColor: actions.setDrawingColor,
            changeCrossSize: actions.changeCrossSize,
            changeLocation: actions.changeLocation,
            changeArrowOrigin: actions.changeArrowOrigin,
            changeArrowDest: actions.changeArrowDest,
            changePolygonPoint: actions.changePolygonPoint,
            cancelDrawing: actions.cancelDrawing,
        }, dispatch),
    })
)(MarkerCreationDetail);
