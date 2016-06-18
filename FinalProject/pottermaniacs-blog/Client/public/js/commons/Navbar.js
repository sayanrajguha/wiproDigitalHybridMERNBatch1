var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Link = ReactRouter.Link;


var Navbar = React.createClass({
  render : function() {
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
                  <a className="navbar-brand" href="index.html">Pottermaniacs</a>
              </div>

              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
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

          </div>

      </nav>
    );
  }
});

module.exports = Navbar;
