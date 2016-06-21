var React = require('react');
var ReactRouter = require('react-router');
var Reflux = require('reflux');
var moment = require('moment');
var Router = ReactRouter.Router;
var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;
var dataStore = require('../../stores/dataStore');
var dataAction = require('../../actions/dataAction');
var config = require('../../../global-config/global.config');

var Dashboard = React.createClass({
  mixins : [Reflux.listenTo(dataStore, 'onDataUpdate')],
  getInitialState : function() {
    return {
      blogData : null
    };
  },
  onDataUpdate : function(data) {
    this.setState({
      blogData : data
    });
  },
  loadUserData : function() {
    dataAction.loadUserData(1);
  },
  componentDidMount : function() {
    this.loadUserData();
  },
  render : function() {
    var renderObj;
    if(this.state.blogData && this.state.blogData.blogs && this.state.blogData.totalBlogs >= 1) {
      renderObj = <UserBlogList blogs={this.state.blogData.blogs} page={this.state.blogData.page} totalPages={this.state.blogData.totalPages} />;
    } else {
      renderObj = null;
    }
    return (
      <div>
        <div className="container dashboard-preview">
        <BlogBody />
        <hr />
        {renderObj}
        </div>
      </div>
    );
  }
});

var BlogBody = React.createClass({
  componentDidMount : function() {
    CKEDITOR.replace( 'blog');
  },
  render : function() {
    return (
      <div className="container">
        <div className="row form-group">
          <textarea className="form-control" rows="8" name="body" id="blog">
          </textarea>
        </div>
        <div className="row form-group">
          <input type="text" className="form-control" name="tags" placeholder="Tags in comma separated format" id="tags" />
        </div>
        <div className="row form-group">
          <input type="text" className="form-control" name="category" placeholder="Categories in comma separated format" id="category" />
        </div>
        <div className="row form-group pull-right">
          <button type="buttton" className="btn btn-success" id="btnBlogAdd">Post</button>
        </div>
      </div>
    );
  }
});

var UserBlogList = React.createClass({
  loadNext : function(e) {
    console.log('Load Next clicked');
    if(this.props.page == this.props.totalPages) {
      console.log('single page only');
      return false;
    }
  },
  render : function() {
    var posts = [];
    var i = 0;
    this.props.blogs.forEach(function(blog) {
      ++i;
      posts.push(<FullBlog blog={blog} key={blog._id} />);
      posts.push(<hr key={i} />);
    }.bind(this));
    return (
      <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
              {posts}
              <ul className="pager">
                  <li className={this.props.page == this.props.totalPages ? "next disabled" : "next" }>
                      <a onClick={this.loadNext}>Older Posts &rarr;</a>
                  </li>
              </ul>
          </div>
      </div>
    );
  }
});

var FullBlog = React.createClass({
  render : function() {
    return (
      <div className="post-preview">
          <a id={this.props.blog._id} onClick={this.showBlog}>
              <h2 className="post-title">
                  {this.props.blog.title}
              </h2>
          </a>
          <p className="post-meta">Posted by <a href="javascript:void(0)">{this.props.blog.author}</a> on {moment(this.props.blog.date).format(config.dateFormat)}</p>
      </div>
    );
  }
});
module.exports = Dashboard;
