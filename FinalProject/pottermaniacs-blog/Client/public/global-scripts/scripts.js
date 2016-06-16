/************************************
Script : Custom script
Author : Sayanraj Guha
Copyright : All rights reserved.
*************************************/
$.fn.stars = function() {
    return this.each(function(i,e){
      $(e).html($('<span/>').width($(e).parent().find('.ratingData').text()*16));
    });
};
function showRegisterForm(){
    $('.loginBox').fadeOut('fast',function(){
        $('.registerBox').fadeIn('fast');
        $('.login-footer').fadeOut('fast',function(){
            $('.register-footer').fadeIn('fast');
        });
    });
}
function showLoginForm(){
    $('.registerBox').fadeOut('fast',function(){
        $('.loginBox').fadeIn('fast');
        $('.register-footer').fadeOut('fast',function(){
            $('.login-footer').fadeIn('fast');
        });

    });
}
// function registerSuccess() {
//   $('.registerBox').fadeOut('fast',function(){
//       $('.register-footer').hide();
//   });
//     //$('#login-section .relogin').removeClass('hide').addClass('show');
// }
// function loginSuccess() {
//   $('.loginBox').fadeOut('fast',function(){
//       $('.login-footer').hide();
//   });
//     //$('#login-section .loginSuccess').removeClass('hide').addClass('show');
// }

function resetForm() {
      $('#login-section .relogin').fadeOut('fast', function() {
        $('.loginBox').fadeIn('fast');
        $('.login-footer').fadeIn('fast');
        $('#login-section .relogin').removeClass('show').addClass('hide');
      });
}
