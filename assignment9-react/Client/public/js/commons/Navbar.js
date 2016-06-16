var React = require('react');
var Reflux = require('reflux');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Link = ReactRouter.Link;
var actions = require('../actions/loginAction');
var store = require('../stores/loginStore');

var Navbar = React.createClass({
  mixins : [Reflux.listenTo(store,"onStoreChange")],
  onStoreChange : function(data) {
    console.log('inside onStoreChange');
    console.log(data);
    this.setState({
      user : data.user,
      token : data.token
    });
    if($('#logoutLinkLI') && $('#logoutLinkLI').hasClass('active')) {
      $('#logoutLinkLI').removeClass('active');
    }
  },
  getInitialState : function() {
    return {
      user : null,
      token : null
    }
  },
  render : function() {
    return (

    <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="/">My To-Watch List</a>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
            {this.state.user == null && this.state.token == null ?
              <ul className="nav navbar-nav">
                <li className="active"><Link to="home" activeClassName="active" onClick={this.changeActiveLI}>Home</Link></li>
                <li><Link to="contact" activeClassName="active" onClick={this.changeActiveLI}>Contact</Link></li>
              </ul>
              :
              <ul className="nav navbar-nav">
                <li className="active"><Link to="dashboard" activeClassName="active" onClick={this.changeActiveLI}>Dashboard</Link></li>
                <li id="moviesLink"><Link to="movies" activeClassName="active" onClick={this.changeActiveLI}>My Movies</Link></li>
                <li><Link to="/contact" activeClassName="active" onClick={this.changeActiveLI}>Contact</Link></li>
              </ul>
            }
          <ul className="nav navbar-nav navbar-right show">
          {this.state.user == null && this.state.token == null ?
            <li><Link to="login" activeClassName="active" onClick={this.changeActiveLI}>Login</Link></li>
            :
            <li id="logoutLinkLI"><Link to="" onClick={this.doLogout}>Logout</Link></li>
          }
          </ul>
        </div>
      </div>
    </nav>
    );
  },
  doLogout : function() {
    actions.logout(this.state.token);
  },
  changeActiveLI : function(e) {
    $('#navbar ul li.active').removeClass('active');
    $(e.target).parent().addClass('active');
  }
});

module.exports = Navbar;
