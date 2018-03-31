import {connect} from 'react-redux';

import UserProfilePage from './UserProfilePage.js';

export default connect(
    (state) => ({user: state.get('user')}),
)(UserProfilePage);
