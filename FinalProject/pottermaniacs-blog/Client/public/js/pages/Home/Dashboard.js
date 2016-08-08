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
  postBlog : function(data) {
    //create blog post
    $.ajax({
      type : 'POST',
      url : config.blogURL,
      headers : {
        'Authorization' : window.localStorage.getItem('token')
      },
      data : data,
      dataType : 'json',
      cache : false,
      error : function(err) {
        console.log('Error occurred : ' + err.message);
        console.log(err.error);
      }.bind(this),
      success : function(response) {
        if(response.hasOwnProperty('statusCode') && response.statusCode == 200) {
          this.loadUserData();
        }
      }.bind(this)
    });
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
        <BlogBody postBlog={this.postBlog} />
        <hr />
        {renderObj}
        </div>
      </div>
    );
  }
});

var BlogBody = React.createClass({
  componentDidMount : function() {
    //CKEDITOR.replace( 'blog');
    CKEDITOR.replace( 'blog', {
    	extraPlugins: 'autogrow',
      autoGrow_minHeight: 200,
    	autoGrow_maxHeight: 800,
    	// Remove the Resize plugin as it does not make sense to use it in conjunction with the AutoGrow plugin.
    	removePlugins: 'resize'
    });
    $('#tagList').tagsInput({
      'defaultText':'Tag1 Tag2 Tag3...',
      'delimiter': [' '],
      'width' : '100%',
      'height' : 'inherit',
      'autosize' : false,
      'removeWithBackspace' : true
    });
    $('#categoryList').tagsInput({
      'defaultText':'Category1 Category2...',
      'delimiter': [' '],
      'width' : '100%',
      'height' : 'inherit',
      'autosize' : false,
      'removeWithBackspace' : true
    });
  },
  handlePostClick : function() {
    var editor = CKEDITOR.instances["blog"];
    var data = {
      title : this.refs.title.value,
      body : editor.getData(),
      hidden : !this.refs.hidden.checked,
      tags : this.refs.tags.value.split(' ').join(),
      category : this.refs.category.value.split(' ').join()
    };
    this.clear();
    this.props.postBlog(data);
  },
  clear : function() {
    var editor = CKEDITOR.instances["blog"];
    this.refs.title.value='';
    editor.setData('');
    this.refs.hidden.checked=false;
    this.refs.tags.value='';
    this.refs.category.value='';
    $('.tagsinput').find('span').remove();
  },
  render : function() {
    return (
      <div className="container">
        <div className="row control-group">
            <div className="form-group col-xs-12 floating-label-form-group controls">
                <label>Title</label>
                <input type="text" className="form-control" ref="title" autoComplete="off" placeholder="Blog Title"
                 id="title" name="title" required />
            </div>
        </div>
        <hr />
        <div className="row form-group">
          <textarea className="form-control" rows="8" name="body" id="blog">
          </textarea>
        </div>
        <div className="row control-group">
            <div className="form-group col-xs-12 floating-label-form-group controls post-meta">
                <label>Tags</label>
                <input type="text" ref="tags" className="form-control" autoComplete="off" id="tagList" name="tags" required />
            </div>
        </div>
        <div className="row control-group">
            <div className="form-group col-xs-12 floating-label-form-group controls post-meta">
                <label>Categories</label>
                <input type="text" className="form-control" ref="category" autoComplete="off" id="categoryList" name="category" required />
            </div>
        </div>
        <div className="row form-group">
          <div className="pull-left checkbox checkbox-success">
            <input type="checkbox" name="hidden" value="true" ref="hidden" id="hidden" />
            <label>Publish</label>
          </div>
          <div className="pull-right">
            <button type="button" onClick={this.handlePostClick} className="btn btn-success" id="btnBlogAdd">Post</button>
          </div>
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
