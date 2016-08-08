var React = require('react');
var ReactRouter = require('react-router');
var Reflux = require('reflux');
var moment = require('moment');
var Router = ReactRouter.Router;
var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;


var Home = React.createClass({
  render : function() {
    return (
      <div>
        <Header />
        <div className="container">

        </div>
      </div>
    );
  }
});
module.exports = Home;
