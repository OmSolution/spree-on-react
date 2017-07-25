import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

import Modal from './shared/modal';
import FlashConnector from '../containers/flash-connector';
import SocialConnector from '../containers/social-connector'

class userLogin extends Component {
  constructor(props){
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleSocialLogin = this.handleSocialLogin.bind(this);
    this.closeModal = this.closeModal.bind(this);
  };

  handleFormSubmit (formData) {
    this.props.submitLoginForm(formData).then((response) => {
      this.closeModal();
    },
    (error) => {});
  };

  handleSocialLogin (usr,error){
    // 1- userid 2- accessToken 3- email 4- first_name 5- last_name 6- picture
    //var data = {user: {id: usr.id, access_token: usr.authResponse.accessToken, email: usr.email, first_name: usr.first_name, last_name: usr.last_name, picture: usr.picture.data.url}}
   var data = {user: {token: usr.token, profile: usr.profile, provider: usr.provider}};
   this.closeModal();
    // this.props.submitLoginForm(data).then((response) => {
    //   this.closeModal();
    // },
    // (error) => {});
    
  };

  closeModal () {
    this.props.closeModal();
    /* Reset the redux form when modal is closed */
    this.props.reset();
  };

  render() {
    const { handleSubmit, valid, submitting } = this.props;

    return (
      <Modal modalClasses="user-form-modal" showModal={ this.props.showModal } closeModal={ this.closeModal } >
        <div className="center-block user-form-process">
          <div className="cmn-user-form">
            <div className="form-heading-title center-heading no-border big">Login</div>
            <FlashConnector />
            <form onSubmit={ handleSubmit(this.handleFormSubmit) }>
              <div className="form-group row no-margin">
                <label className="col-sm-12 control-label">
                  Email
                </label>
                <div className="col-sm-12">
                  <Field className="form-control"
                      name="user[email]"
                      component="input"
                      type="text" />
                </div>
              </div>

              <div className="form-group clearfix">
                <label className="col-sm-12 control-label">
                  Password
                </label>
                <div className="col-sm-12">
                  <Field className="form-control"
                      name="user[password]"
                      component="input"
                      type="password" />
                </div>
              </div>

              <div className="form-group clearfix">
                <div className="col-sm-12 text-center">
                  <button type="submit"
                          disabled={ !valid || submitting }
                          className="btn btn-success btn-lg btn-common">
                          Login
                  </button>
                </div>
              </div>

              <SocialConnector closeModal = {this.closeModal}/>
             
            </form>
          </div>
        </div>
      </Modal>
    );
  };
};

userLogin = reduxForm({
  form: 'userLogin'
})(userLogin);

export default userLogin;
