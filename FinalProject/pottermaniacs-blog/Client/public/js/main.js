var React = require('react');
var ReactRouter = require('react-router');
var ReactDOM = require('react-dom');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var browserHistory = ReactRouter.browserHistory;
var Home = require('./pages/Home/Home');
var Contact = require('./pages/Contact/Contact');
var App = require('./commons/App');

// var AuthenticationHandler = function(nextState, replace) {
//   console.log('AuthenticationHandler invoked!');
//   if(window.localStorage.getItem('token') == null || window.localStorage.getItem('token').trim() == '') {
//     replace({
//       pathname: '/login',
//       state: { nextPathname: nextState.location.pathname }
//     });
//   }
// }
console.log('updated 30');

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App} >
      <IndexRoute component={Home} />
      <Route path="home" component={Home} />
      <Route path="contact" component={Contact} />
    </Route>
  </Router>
  ,
  document.getElementById('content')
);
