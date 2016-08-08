var React = require('react');
var Reflux = require('reflux');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;
var actions = require('../../actions/loginAction');
var store = require('../../stores/loginStore');

var Header = React.createClass({
  toggle : function(e) {
    $('.success p').html('');
    if(e.target.text == 'Sign Up') {
      showRegisterForm();
    } else {
      showLoginForm();
    }
  },
  render : function() {
    return (
      <header className="intro-header" id="header-container" style={{backgroundImage: 'url(../images/home-bg.jpg)'}}>
          <div className="container">
              <div className="row">
                  <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                      <div className="site-heading" key='-1'>
                          <h1>Your dormitory awaits you...</h1>
                          <hr className="small" />
                          <span className="subheading">
                            Your account
                          </span>
                          <span className="subheading login-header">
                            New here? <a onClick={this.toggle}>Sign Up</a> and be a part of this magical world!
                          </span>
                          <span className="subheading register-header" style={{display : 'none'}}>
                            Already a member of this wizarding world? <a onClick={this.toggle}>Log in</a>!
                          </span>
                      </div>
                  </div>
              </div>
          </div>
      </header>
    );
  }
});

var Login = React.createClass({
  getInitialState : function() {
    return {
      isRegistered : false,
      isLoggedIn : false
    };
  },
  mixins : [Reflux.listenTo(store,'onStoreUpdate')],
  onStoreUpdate : function(data) {
    console.log('inside onStoreUpdate.');
    console.log(data);
    var errorView = $('.success p');
    console.log(errorView);
    if(data.hasOwnProperty('isRegistered') && data.isRegistered) {
      this.setState({
        isRegistered : true,
        isLoggedIn : false
      });
      console.log('switching to login form');
      showLoginForm();
    } else if(data.hasOwnProperty('errorCode') && data.errorCode != null) {
      var message = '';
      switch (data.errorCode) {
        case 'INCOMPLETE-DATA':
        message = 'Please fill in all required fields';
          break;
          case 'PASSWORD-MISMATCH':
          message = 'Both passwords do not match!';
            break;
            case 'AUTH-FAIL':
            message = 'Login failed. Incorrect credentials!';
              break;
              case 'USER-DOES-NOT-EXIST':
              message = 'Login failed. User does not exist.';
                break;
                case 'USER-ALREADY-EXISTS':
                message = 'Registration failed. User already exists.';
                  break;
        default: message = data.errorCode;
      }
      errorView.html(message);
      console.log('2 error present. setting both false');
      this.setState({
        isRegistered : false,
        isLoggedIn : false
      });
    } else if(data.user != null && data.token != null) {
      console.log('login success');
      this.setState({
        isRegistered : false,
        isLoggedIn : true
      });
      window.localStorage.setItem('user',data.user);
      window.localStorage.setItem('token',data.token);
      browserHistory.push('dashboard');
    }
    if(data.hasOwnProperty('errorCode') && data.errorCode == null) {
      errorView.html('');
    }
  },
  doLogin : function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('DoLogin called.');
    var data = $('#loginForm').serialize();
    actions.login(data);
    return false;
  },
  doRegister : function(e) {
    e.preventDefault();
    actions.register($('#registerForm').serialize());
    console.log('register data sent');
    return false;
  },
  reset : function() {
    this.clear();
    resetForm();
  },
  clear : function() {
    // this.refs.registerEmail.value='';
    // this.refs.registerFName.value='';
    // this.refs.registerLName.value='';
    // this.refs.registerPassword.value='';
    // this.refs.registerConfPassword.value='';
  },
  componentDidMount : function() {
    $('#dob').datepicker({
      dateFormat : 'yy-mm-dd',
      changeYear : true,
      yearRange : '-100:+0'
    });
  },
  render : function() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
              <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                <div className="loginBox">
                  <form id="loginForm">
                      <div className="row control-group">
                          <div className="form-group col-xs-12 floating-label-form-group controls">
                              <label>Username</label>
                              <input type="text" className="form-control" autoComplete="off" placeholder="Username" id="username" name="username" required />
                              <p className="help-block text-danger"></p>
                          </div>
                      </div>
                      <div className="row control-group">
                          <div className="form-group col-xs-12 floating-label-form-group controls">
                              <label>Password</label>
                              <input type="password" className="form-control" placeholder="Password" id="password" name="password" required />
                              <p className="help-block text-danger"></p>
                          </div>
                      </div>
                      <br />
                      <div className="success text-center alert-danger">
                        <p className=""></p>
                      </div>
                      <div className="row">
                          <div className="form-group col-xs-12 text-center">
                              <button type="button" className="btn btn-default" onClick={this.doLogin}>Login</button>
                          </div>
                      </div>
                  </form>
                </div>
                <div className="registerBox">
                  <form id="registerForm">
                      <div className="row control-group">
                          <div className="form-group col-xs-12 floating-label-form-group controls">
                              <label>Username</label>
                              <input type="text" className="form-control" autoComplete="off" placeholder="Username" id="username" name="username" required />
                              <p className="help-block text-danger"></p>
                          </div>
                      </div>
                      <div className="row control-group">
                          <div className="form-group col-xs-12 floating-label-form-group controls">
                              <label>First Name</label>
                              <input type="text" className="form-control" autoComplete="off" placeholder="First Name" id="firstName" name="firstName" required />
                              <p className="help-block text-danger"></p>
                          </div>
                      </div>
                      <div className="row control-group">
                          <div className="form-group col-xs-12 floating-label-form-group controls">
                              <label>Last Name</label>
                              <input type="text" className="form-control" autoComplete="off" placeholder="Last Name" id="lastName" name="lastName" />
                              <p className="help-block text-danger"></p>
                          </div>
                      </div>
                      <div className="row control-group">
                          <div className="form-group col-xs-12 floating-label-form-group controls">
                              <label>Email</label>
                              <input type="email" className="form-control" autoComplete="off" placeholder="Email" id="email" name="email" required />
                              <p className="help-block text-danger"></p>
                          </div>
                      </div>
                      <div className="row control-group">
                          <div className="form-group col-xs-12 floating-label-form-group controls">
                              <label>Date of Birth</label>
                              <input type="text" className="form-control" style={{backgroundColor : 'initial'}} placeholder="Date of Birth" id="dob" name="dob" readOnly />
                              <p className="help-block text-danger"></p>
                          </div>
                      </div>
                      <div className="row control-group">
                          <div className="form-group col-xs-12 floating-label-form-group controls">
                              <label>Contact Number</label>
                              <input type="text" className="form-control" autoComplete="off" placeholder="Contact Number" id="contact" name="contact" />
                              <p className="help-block text-danger"></p>
                          </div>
                      </div>
                      <br />
                      <div className="row control-group">
                          <div className="form-group col-xs-12 floating-label-form-group controls">
                              <label>Password</label>
                              <input type="password" className="form-control" placeholder="Password" id="password" name="password" required />
                              <p className="help-block text-danger"></p>
                          </div>
                      </div>
                      <div className="row control-group">
                          <div className="form-group col-xs-12 floating-label-form-group controls">
                              <label>Confirm Password</label>
                              <input type="password" className="form-control" placeholder="Re-enter password" id="confPassword" name="confPassword" required />
                              <p className="help-block text-danger"></p>
                          </div>
                      </div>
                      <br />
                      <div className="success text-center alert-danger">
                        <p className=""></p>
                      </div>
                      <br />
                      <div className="row">
                          <div className="form-group col-xs-12 text-center">
                              <button type="button" className="btn btn-default" onClick={this.doRegister}>Register</button>
                          </div>
                      </div>
                  </form>
                </div>
              </div>
          </div>
      </div>
    </div>
    );
  }
});
module.exports = Login;
