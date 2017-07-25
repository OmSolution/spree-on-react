import { connect } from 'react-redux';

import Social from '../components/social';
import Actions from '../actions';
import UserAPI from '../apis/user.js';

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSocialSubmit: (formData) => {
      dispatch(Actions.displayLoader());

      let signupPromise =  UserAPI.signup(formData)

      signupPromise.then((response) => {
        dispatch(Actions.hideLoader());
        dispatch(Actions.login(response.body.user));
        dispatch(Actions.showFlash('Successfully Logged In'));
      },
      (error) => {
        dispatch(Actions.showFlash(error, 'danger'));
        dispatch(Actions.logout());
        dispatch(Actions.hideLoader());
      })

      return signupPromise;
    },

  };
};

const SocialConnector = connect(mapStateToProps, mapDispatchToProps)(Social);

export default SocialConnector;
