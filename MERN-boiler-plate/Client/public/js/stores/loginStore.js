// var Reflux = require('reflux');
// var actions = require('../actions/loginAction');

// var store = Reflux.createStore({
//   init : function() {
//     console.log('login store initializing');
//   },
//   listenables : actions,
//   data : {
//     user : null,
//     token : null,
//     isRegistered : false,
//     errorCode : null
//   },
//   restURL : {
//     loginURL : '/api/users/login',
//     registerURL : '/api/users/register'
//   },
//   onLogin : function(data) {
//     console.log('Inside onLogin');
//     //authenticate the user and store jwt token in local storage
//     $.ajax({
//       type : 'POST',
//       url : this.restURL.loginURL,
//       data : data,
//       dataType : 'json',
//       cache : false,
//       error : function(err) {
//         console.log('Error occurred : ' + err.message);
//         console.log(err.error);
//       }.bind(this),
//       success : function(response) {
//         if(response && response.hasOwnProperty('error')) {
//           console.log('Error occurred : ' + response.message);
//           console.log(response.error);
//           this.data.user = null;
//           this.data.token = null;
//           this.data.isRegistered = false;
//           this.data.errorCode = response.error;
//         } else if(response && response.hasOwnProperty('token') && response.statusCode == 200) {
//           this.data.user = response.username;
//           this.data.token = response.token;
//           this.data.isRegistered = false;
//           this.data.errorCode = null;
//         } else if(response && response.statusCode == 400) {
//           this.data.user = null;
//           this.data.token = null;
//           this.data.isRegistered = false;
//           this.data.errorCode = response.error;
//         }
//         console.log('triggering data');
//         console.log(this.data);
//         this.trigger(this.data);
//       }.bind(this)
//     });
//   },
//   isLoggedIn : function() {
//     if(window.localStorage.getItem('user') != null && window.localStorage.getItem('token') != null) {
//       return true;
//     } else {
//       return false;
//     }
//   },
//   onLogout : function(token) {
//     console.log('Inside onLogout . Token : ' + token);
//     //remove jwt token from local storage
//     this.data.user = null;
//     this.data.token = null;
//     this.data.isRegistered = false;
//     this.data.errorCode = null;
//     window.localStorage.removeItem('user');
//     window.localStorage.removeItem('token');
//     this.trigger(this.data);
//   },
//   onRegister : function(data) {
//     console.log('inside onRegister Data : ' + data);
//     //register the user
//     $.ajax({
//       type : 'POST',
//       url : this.restURL.registerURL,
//       data : data,
//       dataType : 'json',
//       cache : false,
//       error : function(err) {
//         console.log('Error occurred : ' + err.message);
//         console.log(err.error);
//       }.bind(this),
//       success : function(response) {
//         if(response && response.hasOwnProperty('error')) {
//           console.log('Error occurred : ' + response.message);
//           console.log(response.error);
//           this.data.user = null;
//           this.data.token = null;
//           this.data.isRegistered = false;
//           this.data.errorCode = response.error;
//         } else if(response && response.statusCode == 200) {
//           this.data.user = null;
//           this.data.token = null;
//           this.data.isRegistered = true;
//           this.data.errorCode = null;
//         } else if(response && response.statusCode == 400) {
//           this.data.errorCode = response.error;
//           this.data.user = null;
//           this.data.token = null;
//           this.data.isRegistered = false;
//         }
//         this.trigger(this.data);
//       }.bind(this)
//     });
//   }
// });

// module.exports = store;
