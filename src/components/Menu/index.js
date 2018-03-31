import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../App.actions';

import Menu from './Menu.js';

export default connect(
    (state) => ({
        user: state.get('user'),
        openDetail: state.get('display-project-detail'),
    }),
    (dispatch) => ({
        actions: bindActionCreators({
            toggleDisplayDetail: actions.toggleDisplayDetail,
        }, dispatch),
    }),
)(Menu);