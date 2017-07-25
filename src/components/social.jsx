
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

import Modal from './shared/modal';
import FlashConnector from '../containers/flash-connector';
import SocialLogin from 'react-social-login'
import APP_DEFAULTS from '../constants/app-defaults';

class Social extends Component {
  constructor(props){
    super(props);
    this.handleSocialSubmit = this.handleSocialSubmit.bind(this);
  };

  handleSocialSubmit (usr,error){
    //var data = {user: {id: usr.id, access_token: usr.authResponse.accessToken, email: usr.email, first_name: usr.first_name, last_name: usr.last_name, picture: usr.picture.data.url}}
    // this is how it is handled at backend for google
    let provider = (usr.provider == 'google')? usr.provider+'_oauth2' : provider;
   
    var data = {user:{email:''},omniauth: {uid: usr.token.accessToken, provider: provider, email: usr.profile.email}};
   
   this.props.handleSocialSubmit(data).then((response) => {
      this.props.closeModal();
    },
    (error) => {});
  };

  render() {
    const { handleSocialSubmit, valid, submitting } = this.props;

    return (
      <div id="social-icons">
        <center>
          <strong>Login with</strong> &nbsp;
          <SocialLogin 
            provider="facebook" 
            appId={APP_DEFAULTS.facebookAppId}
            callback={this.handleSocialSubmit}>
              <a href="#" title="find us on Facebook"><img alt="follow me on facebook" src="//login.create.net/images/icons/user/facebook_30x30.png"  /></a>
          </SocialLogin>&nbsp;

          <SocialLogin 
            provider="google" 
            appId={APP_DEFAULTS.googleAppId} 
            callback={this.handleSocialSubmit}>
              <a href="#" title="find us on Google"><img alt="follow me on Google" src="http://www.newagebd.com/files/contents/images/icon_social03.png"  /></a>
          </SocialLogin>
        </center>
      </div> 

    );
  };
};


export default Social;


