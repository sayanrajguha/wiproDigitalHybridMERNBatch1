/*

My Custom JS
============

Author:  Sayanraj Guha
Updated: May 2016
Notes:	 Hybrid Training Bootstrap 3 Wipro Digital

*/
$(function() {
    $('.carousel').carousel({
      interval: 2000,
      pause: "hover"
    });
    $("#contactButton").click(function(e) {
        $("#name").val("");
        $("#email").val("");
        $("#contactnumber").val("");
    });

    $("#contactFormSubmit").click(function(e) {
      e.preventDefault();
      if($("#name").val() && $("#email").val() && $("#contactnumber").val()) {
        $("#contactModal").modal("hide");
        $("#successAlert").slideDown();
        $("#myNavBar").collapse("hide");
      }
    });
});
