var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var Dashboard = React.createClass({
  getInitialState : function() {
    return {
      user : window.localStorage.getItem('user')
    };
  },
  render : function() {
    return (
      <div className="site-wrapper">
        <div className="site-wrapper-inner">
          <div className="container box">
            <div className="inner cover">
              <h1 className="cover-heading">Dashboard</h1>
              <p className="lead">
                Welcome {this.state.user} !
              </p>
              <hr />
              <p className="lead">
                <Link to="/movies" className="btn btn-lg btn-default" onClick={this.changeLIActive}>Click Here to start making your To-Watch list!</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Dashboard;
