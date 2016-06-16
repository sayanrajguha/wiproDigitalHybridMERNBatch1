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
        <div className="site-wrapper-inner">
          <div className="container box">
            <div className="inner cover">
              <h1 className="cover-heading">Cinema is a matter of what&#39;s in the frame; and what&#39;s out!</h1>
              <p className="lead">
                Let&#39;s make a To-Watch List
              </p>
              <p className="lead">
                <Link to="/movies" className="btn btn-lg btn-default" onClick={this.changeLIActive}>Start Here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Home;
