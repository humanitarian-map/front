import {connect} from 'react-redux';
import actions from '../../App.actions';

export default connect(
    (state) => ({
        map: state.get('map'),
        user: state.get('user'),
        project: state.get('current-project'),
        documents: state.get('documents'),
        displayProjectDetail: state.get('display-project-detail'),
    }),
    (dispatch) => ({
        actions: bindActionCreators({
            getCurrentProject: actions.getCurrentProject,
            getCurrentProjectPoints: actions.getCurrentProjectPoints,
            getProjectDocuments: actions.getProjectDocuments,
        }, dispatch),
    })
)(MapPage);
