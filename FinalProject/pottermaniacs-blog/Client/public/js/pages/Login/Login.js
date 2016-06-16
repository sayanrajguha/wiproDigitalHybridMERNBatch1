var React = require('react');
var Reflux = require('reflux');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;
var actions = require('../../actions/loginAction');
var store = require('../../stores/loginStore');

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
    var errorView = $('#login-section #error');
    if(data.hasOwnProperty('isRegistered') && data.isRegistered) {
      this.setState({
        isRegistered : true,
        isLoggedIn : false
      });
      console.log('switching login form');
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
      console.log('error present. setting both false');
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
      browserHistory.push('/dashboard');
    }
    if(data.hasOwnProperty('errorCode') && data.errorCode == null) {
      errorView.html('');
    }
  },
  doLogin : function(e) {
    e.preventDefault();
    console.log('DoLogin called.');
    var data = $('#loginForm').serialize();
    e.stopPropagation();
    actions.login(data);
    return false;
  },
  doRegister : function(e) {
    e.preventDefault();
    actions.register($('#registrationForm').serialize());
    console.log('register data sent');
    return false;
  },
  reset : function() {
    this.clear();
    resetForm();
  },
  clear : function() {
    this.refs.registerEmail.value='';
    this.refs.registerFName.value='';
    this.refs.registerLName.value='';
    this.refs.registerPassword.value='';
    this.refs.registerConfPassword.value='';
  },
  render : function() {
    return (
      <div className="login">
      <div className="lbox" id="login-section">
           <div className="content">
              <div className="social">
                  <a className="circle github" href="/auth/github">
                      <i className="fa fa-github fa-fw"></i>
                  </a>
                  <a id="google_login" className="circle google" href="">
                      <i className="fa fa-google-plus fa-fw"></i>
                  </a>
                  <a id="facebook_login" className="circle facebook" href="">
                      <i className="fa fa-facebook fa-fw"></i>
                  </a>
                  <p className="caption">
                    Work In Progress
                  </p>
              </div>
              <div className="division">
                  <div className="line l"></div>
                    <span>or</span>
                  <div className="line r"></div>
              </div>
              <div id="error">
              </div>
              <div className={this.state.isRegistered ? "relogin show" : "relogin hide"}>
                <p> Registration Successful! Please login to continue...</p>
              </div>
              <div className="form loginBox">
                  <form id="loginForm">
                  <input id="email" className="form-control" type="text" placeholder="Email" name="email" ref="userEmail" />
                  <input id="password" className="form-control" type="password" placeholder="Password" name="password" ref="userPassword" />
                  </form>
                  <div className="text-center">
                    <input className="btn btn-success btn-login" type="button" value="Login" onClick={this.doLogin} />
                  </div>
              </div>
           </div>
      </div>
      <div className="lbox registerBox">
          <div className="content registerBox">
           <div className="form">
              <form method="post" id="registrationForm">
              <input id="email" className="form-control" type="text" ref='registerEmail' placeholder="Email" name="email" />
              <input id="fName" className="form-control" type="text" placeholder="First Name" ref='registerFName' name="firstName" />
              <input id="lName" className="form-control" type="text" placeholder="Last Name" ref='registerLName' name="lastName" />
              <input id="password" className="form-control" type="password" placeholder="Password" ref='registerPassword' name="password" />
              <input id="password_confirmation" className="form-control" type="password" placeholder="Confirm Password" ref='registerConfPassword' name="confPassword" />
              </form>
              <input className="btn btn-primary btn-register" type="button" value="Create account" onClick={this.doRegister} name="Register" />
              </div>
          </div>
      </div>
      <div className="lbox">
        <div className="login-footer">
            <span>New user? {' '}
                 <a href="javascript:showRegisterForm()">Create an account&#33; </a>
            </span>
        </div>
        <div className="register-footer">
             <span>Already have an account? {' '}</span>
             <a href="javascript:showLoginForm()">Login</a>
        </div>
      </div>
      </div>
    );
  }
});
module.exports = Login;
