var React = require('react');
var ReactRouter = require('react-router');
var Reflux = require('reflux');
var Router = ReactRouter.Router;
var Link = ReactRouter.Link;
var dataStore = require('../../stores/dataStore');
var dataAction = require('../../actions/dataAction');

var Header = React.createClass({
  render : function() {
    return (
      <header className="intro-header" id="header-container" style={{backgroundImage: 'url(../images/home-bg.jpg)'}}>
          <div className="container">
              <div className="row">
                  <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                  {this.props.isShowingBlog ?
                    [
                      <div className="post-heading" key={this.props.blog._id}>
                        <h1>{this.props.blog.title}</h1>
                        <span className="meta">Posted by <a href="javascript:void(0)">{this.props.blog.author}</a> on {this.props.blog.date}</span>
                    </div>
                    ]
                    :
                    [
                      <div className="site-heading" key='-1'>
                          <h1>Blog on Potterheads!</h1>
                          <hr className="small" />
                          <span className="subheading">
                          <blockquote>
                          Words are, in my not-so-humble opinion, our most inexhaustible source of magic.
                          Capable of both inflicting injury, and remedying it.
                          <cite>Albus Dumbledore,&nbsp;Harry Potter and the Deathly Hallows</cite>
                          </blockquote>
                          </span>
                      </div>
                    ]
                  }
                  </div>
              </div>
          </div>
      </header>
    );
  }
});

var Home = React.createClass({
  restURL : {
    getBlogByIdURL : '/api/blog/action/'
  },
  mixins : [Reflux.listenTo(dataStore, 'onDataUpdate')],
  getInitialState : function() {
    return {
      blogData : null,
      showBlog : {
        isShowingBlog : false,
        blog : null
      }
    };
  },
  onDataUpdate : function(data) {
    console.log(data);
    this.setState({
      blogData : data
    });
  },
  onShowBlog : function(blogID) {
    $.ajax({
      type : 'GET',
      url : this.restURL.getBlogByIdURL + blogID,
      dataType : 'json',
      cache : false,
      error : function(err) {
        console.log('Error occurred : ' + err.message);
        console.log(err.error);
      }.bind(this),
      success : function(response) {
        if(response.hasOwnProperty('statusCode') && response.statusCode == 400) {
          //blog not found.
          console.log('blog not found');
        } else {
          this.setState({
            showBlog : {
              isShowingBlog : true,
              blog : response
            }
          });
        }
      }.bind(this)
    });
  },
  loadData : function() {
    dataAction.load(1);
  },
  componentDidMount : function() {
    this.loadData();
  },
  render : function() {
    var renderObj;
    if(this.state.showBlog.isShowingBlog) {
      renderObj = <FullBlogPost blog={this.state.showBlog.blog} />;
    } else if(this.state.blogData && this.state.blogData.blogs && this.state.blogData.totalBlogs >= 1) {
      renderObj = <BlogList onShowBlog={this.onShowBlog}
      blogs={this.state.blogData.blogs} page={this.state.blogData.page} totalPages={this.state.blogData.totalPages} />;
    } else {
      renderObj = null;
    }
    return (
      <div>
        <Header isShowingBlog={this.state.showBlog.isShowingBlog} blog={this.state.showBlog.blog}/>
        <div className="container">
        {renderObj}
        </div>
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
      posts.push(<MinBlogPost onShowBlog={this.props.onShowBlog} blog={blog} key={blog._id} />);
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

var MinBlogPost = React.createClass({
  showBlog : function(e) {
    this.props.onShowBlog($(e.target).parent().attr('id'));
  },
  render : function() {
    return (
      <div className="post-preview">
          <a id={this.props.blog._id} onClick={this.showBlog}>
              <h2 className="post-title">
                  {this.props.blog.title}
              </h2>
          </a>
          <p className="post-meta">Posted by <a href="javascript:void(0)">{this.props.blog.author}</a> on {this.props.blog.date}</p>
      </div>
    );
  }
});

var FullBlogPost = React.createClass({
  render : function() {
    return (
      <article>
        <div className="container">
            <div className="row">
                <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1" dangerouslySetInnerHTML={{__html: this.props.blog.body}}>
                </div>
            </div>
        </div>
    </article>
    );
  }
});

module.exports = Home;
