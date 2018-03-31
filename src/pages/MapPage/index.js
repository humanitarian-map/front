import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../App.actions';

import MapPage from './MapPage.js';

export default connect(
    (state) => ({
        map: state.get('map'),
        user: state.get('user'),
        project: state.get('currentProject'),
        documents: state.get('documents'),
        displayProjectDetail: state.getIn(['ui', 'displayProjectDetail']),
    }),
    (dispatch) => ({
        actions: bindActionCreators({
            getCurrentProject: actions.getCurrentProject,
            getCurrentProjectPoints: actions.getCurrentProjectPoints,
            getProjectDocuments: actions.getProjectDocuments,
        }, dispatch),
    })
)(MapPage);
