import React, { Component } from 'react';

import BrandHeader from './header/brand-header';
import FilterBarConnector from '../../containers/taxon-filters/filter-bar-connector';
import CartNotificationInfoConnector from '../../containers/cart/notification-info-connector';
import SearchFormConnector from '../../containers/search-form-connector';
import UserLoginConnector  from '../../containers/user-login-connector';
import UserSignupConnector  from '../../containers/user-signup-connector';
import { DropdownButton, MenuItem } from 'react-bootstrap';

class Header extends Component {

  componentDidUpdate(nextProps, nextState) {
    this.props.fetchTaxons(this.props.taxons);
  };

  constructor(props) {
    super(props);

    this.state = { showSigninModal: false, showSignupModel:false };
    this.openSigninModal = this.openSigninModal.bind(this);
    this.closeSigninModal = this.closeSigninModal.bind(this);

    this.openSignupModal = this.openSignupModal.bind(this);
    this.closeSignupModal = this.closeSignupModal.bind(this);
  };

  openSigninModal() {
    this.setState({ showSigninModal: true });
  };

  closeSigninModal() {
    this.setState({ showSigninModal: false });
  };

  openSignupModal() {
    this.setState({ showSignupModal: true });
  };

  closeSignupModal() {
    this.setState({ showSignupModal: false });
  };

  navIcons () {
    let userSessionActionMarkup;
    let { user } = this.props;

    if (this.props.user.id) {
      userSessionActionMarkup = <dd className='icon-block user-link-block'>
        <DropdownButton title={ `Hello, ${ user.email.split('@')[0] } ` } className='btn-link' bsStyle='link' id='user-account-dropdown'>
          <MenuItem onClick={ this.props.goToUserOrders }>Your Orders</MenuItem>
          <MenuItem eventKey="2" onClick={ this.props.logout }>SignOut</MenuItem>
        </DropdownButton>
      </dd>;
    }
    else {
      userSessionActionMarkup = <dd className='icon-block user-link-block'>
        <a  className="primary-link" onClick={ this.openSigninModal }>
          <span className="glyphicon glyphicon-user"></span>
          Login
        </a>
        <a className="primary-link" onClick={ this.openSignupModal }>
          <span className="glyphicon glyphicon-user"></span>
          Register
        </a>
      </dd>;
    }

    return <dl className="nav-icons pull-right">

              { userSessionActionMarkup }

              <CartNotificationInfoConnector />
              <UserLoginConnector showModal={ this.state.showSigninModal } closeModal={ this.closeSigninModal } />
              <UserSignupConnector showModal={ this.state.showSignupModal } closeModal={ this.closeSignupModal } />
              <SearchFormConnector />
           </dl>;
  };

  render() {
    let userLoggedInClass = this.props.user.id ? 'user-logged-in ' : 'guest-user ';
    return (
      <nav className={ "navbar navbar-inverse navbar-fixed-top " +  userLoggedInClass }>
        <div className="container-fluid">
          <BrandHeader />
          { this.navIcons() }
          <div className="navbar-collapse collapse row">
            <FilterBarConnector />
          </div>
        </div>
      </nav>
    );
  };
};

export default Header;
