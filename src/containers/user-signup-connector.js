import { connect } from 'react-redux';

import UserSignup from '../components/user-signup';
import Actions from '../actions';
import UserAPI from '../apis/user.js';

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitSignupForm: (formData) => {
      dispatch(Actions.displayLoader());

      let signupPromise =  UserAPI.signup(formData)

      signupPromise.then((response) => {
        console.log(response);
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

const UserSignupConnector = connect(mapStateToProps, mapDispatchToProps)(UserSignup);

export default UserSignupConnector;
