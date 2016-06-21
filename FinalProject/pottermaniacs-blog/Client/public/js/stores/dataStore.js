var Reflux = require('reflux');
var actions = require('../actions/dataAction');

var store = Reflux.createStore({
  init : function() {
    console.log('data store initializing');
  },
  listenables : actions,
  data : {
    blogs : null,
    totalBlogs : 0,
    blogsPerPage : 0,
    page : 0,
    totalPages : 0
  },
  restURL : {
    getAllDataURL : '/api/blog/getAll',
    getUserDataURL : '/api/blog'
  },
  onLoad : function(page) {
    console.log('Inside onLoad');
    //load latest blogs
    $.ajax({
      type : 'GET',
      url : this.restURL.getAllDataURL,
      dataType : 'json',
      cache : false,
      error : function(err) {
        console.log('Error occurred : ' + err.message);
        console.log(err.error);
      }.bind(this),
      success : function(response) {
        if(response.hasOwnProperty('total') && response.total > 0) {
          this.data = {
            blogs : response.docs,
            totalBlogs : response.total,
            blogsPerPage : response.limit,
            page : response.page,
            totalPages : response.pages
          };
        } else {
          this.data = {
            blogs : null,
            totalBlogs : 0,
            blogsPerPage : 0,
            page : 0,
            totalPages : 0
          };
        }
        this.trigger(this.data);
      }.bind(this)
    });
  },
  onLoadUserData : function(page) {
    console.log('Inside onLoadUserData');
    //load latest blogs for particular user
    $.ajax({
      type : 'GET',
      url : this.restURL.getUserDataURL,
      headers : {
        'Authorization' : window.localStorage.getItem('token')
      },
      dataType : 'json',
      cache : false,
      error : function(err) {
        console.log('Error occurred : ' + err.message);
        console.log(err.error);
      }.bind(this),
      success : function(response) {
        if(response.hasOwnProperty('total') && response.total > 0) {
          this.data = {
            blogs : response.docs,
            totalBlogs : response.total,
            blogsPerPage : response.limit,
            page : response.page,
            totalPages : response.pages
          };
        } else {
          this.data = {
            blogs : null,
            totalBlogs : 0,
            blogsPerPage : 0,
            page : 0,
            totalPages : 0
          };
        }
        this.trigger(this.data);
      }.bind(this)
    });
  }
});

module.exports = store;
