var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Link = ReactRouter.Link;

var Footer = React.createClass({
  render : function() {
    return (
      <footer>
          <div className="container">
              <div className="row">
                  <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                      <ul className="list-inline text-center">
                          <li>
                              <a href="#">
                                  <span className="fa-stack fa-lg">
                                      <i className="fa fa-circle fa-stack-2x"></i>
                                      <i className="fa fa-twitter fa-stack-1x fa-inverse"></i>
                                  </span>
                              </a>
                          </li>
                          <li>
                              <a href="#">
                                  <span className="fa-stack fa-lg">
                                      <i className="fa fa-circle fa-stack-2x"></i>
                                      <i className="fa fa-facebook fa-stack-1x fa-inverse"></i>
                                  </span>
                              </a>
                          </li>
                          <li>
                              <a href="#">
                                  <span className="fa-stack fa-lg">
                                      <i className="fa fa-circle fa-stack-2x"></i>
                                      <i className="fa fa-github fa-stack-1x fa-inverse"></i>
                                  </span>
                              </a>
                          </li>
                      </ul>
                      <p className="copyright text-muted">Copyright &copy; <a href='mailto:sayanrajguha@gmail.com'>sayanrajguha@gmail.com</a>
                      &emsp;
                       All rights reserved.
                      </p>
                      <p className="copyright text-muted"> Theme : Clean Blog Theme by <a href='http://startbootstrap.com'>Start Bootstrap</a></p>
                  </div>
              </div>
          </div>
      </footer>
    );
  }
});

module.exports = Footer;
