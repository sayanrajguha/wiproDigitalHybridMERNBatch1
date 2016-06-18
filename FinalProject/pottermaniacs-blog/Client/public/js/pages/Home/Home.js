var React = require('react');
var ReactRouter = require('react-router');
var Reflux = require('reflux');
var Router = ReactRouter.Router;
var Link = ReactRouter.Link;
var dataStore = require('../../stores/dataStore');
var dataAction = require('../../actions/dataAction');

var Home = React.createClass({
  mixins : [Reflux.listenTo(dataStore, 'onDataUpdate')],
  getInitialState : function() {
    return {
      blogs : null,
      totalBlogs : 0,
      blogsPerPage : 0,
      page : 0,
      totalPages : 0
    };
  },
  onDataUpdate : function(data) {
    console.log(data);
    this.setState({
      blogs : data.blogs,
      totalBlogs : data.totalBlogs,
      blogsPerPage : data.blogsPerPage,
      page : data.page,
      totalPages : data.totalPages
    });
  },
  loadData : function() {
    dataAction.load(1);
  },
  componentDidMount : function() {
    this.loadData();
  },
  render : function() {
    return (
      <div class="container">
      {this.state.blogs && this.state.totalBlogs >= 1 ?
        <BlogList blogs={this.state.blogs} page={this.state.page} totalPages={this.state.totalPages} />
        :
        null
        // <div className="alert alert-warning fade in noMovieAlert" role="alert">
        //   <span className="glyphicon glyphicon-shopping-cart"></span>
        //   {' '}
        //   <span id="caption">You do not have any movies in your list</span>
        // </div>
      }
      </div>
    );
  }
});

var BlogList = React.createClass({
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
      posts.push(<BlogPost blog={blog} key={blog._id} />);
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

var BlogPost = React.createClass({
  render : function() {
    return (
      <div className="post-preview">
          <a href="post.html">
              <h2 className="post-title">
                  {this.props.blog.title}
              </h2>
              <h3 className="post-subtitle">
                  {this.props.blog.body && this.props.blog.body.length > 100 ? (this.props.blog.body.substring(0,100) + '...') : this.props.blog.body}
              </h3>
          </a>
          <p className="post-meta">Posted by <a href="javascript:void(0)">{this.props.blog.author}</a> on {this.props.blog.date}</p>
      </div>
    );
  }
});

module.exports = Home;
