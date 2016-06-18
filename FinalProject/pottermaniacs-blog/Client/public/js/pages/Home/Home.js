var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Link = ReactRouter.Link;

var Home = React.createClass({
  changeLIActive : function() {
    $('#navbar ul li.active').removeClass('active');
    $('#moviesLink').addClass('active');
  },
  render : function() {
    return (
      <div className="site-wrapper">
        <p>This area will contain home content</p>
      </div>
    );
  }
});

module.exports = Home;
