import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../App.actions';

import ProjectDetail from './ProjectDetail.js';

export default connect(
    (state) => {
        const project = state.get('currentProject');
        const organization = state.get('organizations').get(project.get('organization_id'));
        return {
            currentPosition: state.getIn(['map', 'currentPosition']),
            project,
            points: state.get('currentProjectPoints'),
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
