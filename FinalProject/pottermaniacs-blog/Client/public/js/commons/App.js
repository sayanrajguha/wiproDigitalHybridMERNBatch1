var React = require('react');
var Navbar = require('./Navbar');
var Header = require('./Header');
var Footer = require('./Footer');

var App = React.createClass( {
  render : function() {
    return (
      <div>
      <Navbar />
      <Header />
      {this.props.children}
      <Footer />
      </div>
    )
  }
});
module.exports = App;
