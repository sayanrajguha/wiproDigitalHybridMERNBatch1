var React = require('react');
var ReactRouter = require('react-router');
var Reflux = require('reflux');
var Router = ReactRouter.Router;
var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;
var actions = require('../actions/loginAction');
var store = require('../stores/loginStore');


var Navbar = React.createClass({
  getInitialState : function() {
    return {
      isLoggedIn : false
    };
  },
  mixins : [Reflux.listenTo(store,'onStoreUpdate')],
  onStoreUpdate : function(data) {

    if(data.hasOwnProperty('errorCode') && data.errorCode != null) {
      this.setState({
        isLoggedIn : false
      });
    } else if(data.user != null && data.token != null) {
      this.setState({
        isLoggedIn : true
      });
    }
  },
  logOut : function() {
    console.log('logging out user');
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('token');
    this.setState({
      isLoggedIn : false
    });
    browserHistory.push('/home');
  },
  render : function() {
    var menu = null;
    if(this.state.isLoggedIn) {
      menu = [
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1" key='1'>
            <ul className="nav navbar-nav navbar-right">
                <li>
                    <Link to="home">Blog Feed</Link>
                </li>
                <li>
                    <Link to="dashboard">My Blogs</Link>
                </li>
                <li>
                    <Link to="about">About</Link>
                </li>
                <li>
                    <Link to="contact">Contact</Link>
                </li>
                <li className="dropdown">
                  <a href="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                    <span className="glyphicon glyphicon-user"></span>
                    <span className="caret"></span>
                  </a>
                  <ul className="dropdown-menu">
                    <li><a href="javascript:void(0)">Profile</a></li>
                    <li role="separator" className="divider"></li>
                    <li><a href="javascript:void(0)" onClick={this.logOut}>Logout</a></li>
                  </ul>
                </li>
            </ul>
        </div>
      ];
    } else {
      menu = [
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1" key='2'>
            <ul className="nav navbar-nav navbar-right">
                <li>
                    <Link to="home">Home</Link>
                </li>
                <li>
                    <Link to="about">About</Link>
                </li>
                <li>
                    <Link to="contact">Contact</Link>
                </li>
                <li>
                    <Link to="login">Login</Link>
                </li>
            </ul>
        </div>
      ];
    }
    return (
      <nav className="navbar navbar-default navbar-custom navbar-fixed-top">
          <div className="container-fluid">
              <div className="navbar-header page-scroll">
                  <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                      <span className="sr-only">Toggle navigation</span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                  </button>
                  <a className="navbar-brand" href="/">Pottermaniacs</a>
              </div>
              {menu}
          </div>
      </nav>
    );
  }
});

module.exports = Navbar;
