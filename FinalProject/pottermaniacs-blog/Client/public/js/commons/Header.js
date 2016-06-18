var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Link = ReactRouter.Link;

var Header = React.createClass({
  render : function() {
    return (
      <header className="intro-header" id="header-container">
          <div className="container">
              <div className="row">
                  <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                      <div className="site-heading">
                          <h1>Blog on Potterheads!</h1>
                          <hr className="small" />
                          <span className="subheading">
                          <blockquote>
                          Words are, in my not-so-humble opinion, our most inexhaustible source of magic.
                          Capable of both inflicting injury, and remedying it.
                          <cite>Albus Dumbledore,&nbsp;Harry Potter and the Deathly Hallows</cite>
                          </blockquote>
                          </span>
                      </div>
                  </div>
              </div>
          </div>
      </header>
    );
  }
});

module.exports = Header;
