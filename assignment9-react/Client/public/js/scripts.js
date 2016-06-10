/************************************
Script : Custom script
Author : Sayanraj Guha
Copyright : All rights reserved.
*************************************/
function showRegisterForm(){
    $('.loginBox').fadeOut('fast',function(){
        $('.registerBox').fadeIn('fast');
        $('.login-footer').fadeOut('fast',function(){
            $('.register-footer').fadeIn('fast');
        });
        $('#loginModal .modal-title').html('Register with');
    });
    $('#loginModal .error').removeClass('alert alert-danger').html('');

}
function showLoginForm(){
    $('.registerBox').fadeOut('fast',function(){
        $('.loginBox').fadeIn('fast');
        $('.register-footer').fadeOut('fast',function(){
            $('.login-footer').fadeIn('fast');
        });

        $('#loginModal .modal-title').html('Login with');
    });
     $('#loginModal .error').removeClass('alert alert-danger').html('');
}
