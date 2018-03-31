import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../App.actions';

import ProjectDetail from './ProjectDetail.js';

export default connect(
    (state) => {
        const project = state.get('current-project');
        const organization = state.get('organizations').get(project.get('organization_id'));
        return {
            currentPosition: state.getIn(['map', 'current-position']),
            project,
            points: state.get('current-project-points'),
            organization,
        };
    },
    (dispatch) => ({
        actions: bindActionCreators({
            visualizeMarker: actions.visualizeMarker,
            centerMap: actions.centerMap,
            setProjectCenter: actions.setProjectCenter,
        }, dispatch),
    })
)(ProjectDetail);
