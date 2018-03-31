import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../App.actions';

import MarkerDetail from './MarkerDetail.js';

export default connect(
    (state) => ({
        marker: state.getIn(['map', 'viewing']).toJS(),
        project: state.get('currentProject'),
        documents: state.get('documents'),
    }),
    (dispatch) => ({
        actions: bindActionCreators({
            deleteMarker: actions.deleteMarker,
        }, dispatch),
    })
)(MarkerDetail);
