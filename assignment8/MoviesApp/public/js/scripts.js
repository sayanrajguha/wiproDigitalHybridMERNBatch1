// Empty JS for your own code to be here

/******************************************
Global Funcions
*******************************************/
const imagePath = '/images-poster/';
const imagePlaceHolderPath = '/images/image-placeholder.png';
$.fn.stars = function() {
    return this.each(function(i,e){$(e).html($('<span/>').width($(e).text()*16));});
};
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
    $('#loginModal .registerBox').fadeOut('fast',function(){
        $('.loginBox').fadeIn('fast');
        $('.register-footer').fadeOut('fast',function(){
            $('.login-footer').fadeIn('fast');
        });

        $('#loginModal .modal-title').html('Login with');
    });
     $('#loginModal .error').removeClass('alert alert-danger').html('');
}
/*******************************************
Post DOM load functions
*******************************************/
$(function() {
  var currentObject = {};

  function loadModule(module) {
    if(module) {
      console.log(module);
      console.log('poster : ' + module.Poster);
      if(module.Poster != "" && module.Poster != undefined) {
          $("#poster").attr('src',imagePath+module.Poster);
          $('#txtPoster').val(module.Poster);
      } else {
          $("#poster").attr('src',imagePlaceHolderPath);
          $('#txtPoster').val("");
      }
      $("#movieTitle").text(module.Title);
      $("#year").text(module.Year);
      $("#language").text(module.Language);
      $("#genre").text(module.Genre);
      $("#director").text(module.Director);
      $("#writer").text(module.Writer);
      $("#actors").text(module.Actors);
      $("#plot").text(module.Plot);
      $("#releaseDate").text(module.Released);
      $("#runTime").text(module.Runtime);
      $("#rating").text(module.imdbRating);
      $("#awards").text(module.Awards);


      $('.stars').stars();
    }
  }

  function loadModuleInPopup(module) {
    if(module) {
      if(module.Poster != "") {
          $("#poster").attr('src',imagePath+module.Poster);
          $("#addFormPoster").attr('src',imagePath+module.Poster);
      } else {
          $("#poster").attr('src',imagePlaceHolderPath);
          $("#addFormPoster").attr('src',imagePlaceHolderPath);
      }
      $("#txtId").val(module._id);
      $("#txtTitle").val(module.Title);
      $("#txtYear").val(module.Year);
      $("#txtLanguage").val(module.Language);
      $("#txtGenre").val(module.Genre);
      $("#txtDirector").val(module.Director);
      $("#txtWriter").val(module.Writer);
      $("#txtActors").val(module.Actors);
      $("#txtPlot").val(module.Plot);
      $("#txtReleaseDate").val(module.Released);
      $("#txtRunTime").val(module.Runtime);
      $("#txtRating").val(module.imdbRating);
      $("#txtAwards").val(module.Awards);
    }
  }

  function clearModalFields() {
    $("#txtid").val("");
    $("#txtPoster").val("");
    $("#txtTitle").val("");
    $("#txtYear").val("");
    $("#txtLanguage").val("");
    $("#txtGenre").val("");
    $("#txtDirector").val("");
    $("#txtWriter").val("");
    $("#txtActors").val("");
    $("#txtPlot").val("");
    $("#txtReleaseDate").val("");
    $("#txtRunTime").val("");
    $("#txtRating").val("");
    $("#txtAwards").val("");
    $('.bootstrap-filestyle :input').val("");
    $('#addFormPoster').attr('src',imagePlaceHolderPath);
  }
  function loadData(page) {
    $.ajax({
      type : 'GET',
      url : '/movies/page/' + page,
      dataType : 'json',
      cache : false,
      error : function(err) {
        console.log('Error occurred : ' + err);
      },
      success : function(response) {
        // console.log(response);
        if(response.statusCode == 200 && response.message == 'SUCCESS') {
          currentObject = response;
          if(response.totalRecords <= 0) {
            console.log('No record present');
            $('#myEmptyJumboTron').show();
            $('#main').hide();
          } else {
            $('#myEmptyJumboTron').hide();
            $('#main').show();
            if(response.totalRecords == 1) {
              $('#loadPrev').parent().addClass('disabled');
              $('#loadNext').parent().addClass('disabled');
              //and disable pagination
            } else {
              $('#loadPrev').parent().removeClass('disabled');
              $('#loadNext').parent().removeClass('disabled');
              //enable pagination
            }
            loadModule(response.movies[0]);
          }
        }
      }
    });
  }

  function loadDataWithId(id) {
    console.log('Loading data with id : '+ id);
    $.ajax({
      type : 'GET',
      url : '/movies/' + id,
      dataType : 'json',
      cache : false,
      error : function(err) {
        console.log('Error occurred : ' + err);
      },
      success : function(response) {
        // console.log(response);
        if(response.statusCode != 200 || response.message != 'SUCCESS' || response.movie == undefined
         || response.movie == null || $.isEmptyObject(response.movie)) {
           //diplay some error
           console.log('movie with id not found');
        } else {
          console.log('Loading data');
          currentObject.movies[0] = response.movie;
          loadModule(response.movie); //load data
        }
      }
    });
  }

  function validateMovie() {
    $('#movieError').show();
    if($("#txtTitle").val().trim() == "" ||
    $("#txtYear").val().trim() == "" ||
    $("#txtLanguage").val().trim() == "" ||
    $("#txtGenre").val().trim() == "" ||
    $("#txtDirector").val().trim() == "" ||
    $("#txtWriter").val().trim() == "" ||
    $("#txtActors").val().trim() == "" ||
    $("#txtPlot").val().trim() == "" ||
    $("#txtReleaseDate").val().trim() == "" ||
    $("#txtRunTime").val().trim() == "" ||
    $("#txtRating").val().trim() == "" ||
    $("#txtAwards").val().trim() == "") {
      console.log('error');
      $('#movieError').html('<strong>All fields are mandatory.</strong> Enter <strong>N/A</strong> for empty fields.');
      return false;
    } else if(!$.isNumeric($("#txtYear").val())) {
      console.log('error');
      $('#movieError').html('<strong>Year</strong> has to be a numeric value');
      return false;
    } else if(!$.isNumeric($("#txtRating").val()) || Number($("#txtRating").val()) < 0 ||
              Number($("#txtRating").val()) > 10 ) {
      console.log('error');
      $('#movieError').html('<strong>Rating</strong> has to be a number between 0 and 10');
      return false;
    }
    $('#movieError').hide();
    return true;
  }

    $(document).on('hidden.bs.modal', function () {
      $('body').addClass('modal-open');
    });

    $('#loadPrev').click(function(e) {
      e.preventDefault();
      console.log('Prev clicked!');
      var page = currentObject.currentPage;
      --page;
      if(page < 1) {
        page = currentObject.numberOfPages;
      }
      console.log('Page : '+page);
      loadData(page);
    });
    $('#loadNext').click(function(e) {
      e.preventDefault();
      console.log('Next clicked!');
      var page = currentObject.currentPage;
      ++page;
      if(page > currentObject.numberOfPages) {
        page = 1;
      }
      console.log('Page : '+page);
      loadData(page);

    });
    $('.btnAdd').click(function(e) {
      e.preventDefault();

      console.log('Add starting...');
      clearModalFields();
      $('#addMovieModal .modal-title').text('New Movie');
      $('#updateMovieSubmit').addClass('hidden');
      $('#addMovieSubmit').removeClass('hidden');
      $('#addMovieModal').modal('show');
    });
    $('#btnUpdate').click(function(e) {
      e.preventDefault();
      console.log('Update starting...');
      loadModuleInPopup(currentObject.movies[0]);
      $('#addMovieModal .modal-title').text('Update Movie');
      $('#addMovieSubmit').addClass('hidden');
      $('#updateMovieSubmit').removeClass('hidden');
      $('#addMovieModal').modal('show');
    });
    $('#btnDelete').click(function(e) {
      e.preventDefault();
      console.log('Delete starting...');

      $('#deleteConfirmModal').modal('show');
    });
    $('#btnConfirmDelete').click(function(e) {
      e.preventDefault();
      //proceed with delete operation
      var id = currentObject.movies[0]._id;
      console.log(id);
      $.ajax({
        type : 'DELETE',
        url : '/movies/' + id,
        dataType : 'json',
        cache : false,
        error : function(err) {
          console.log('Error occurred : ' + err);
        },
        success : function(response) {
          // console.log(response);
          if(response.statusCode == 200 && response.message == 'SUCCESS') {
            console.log('delete successful');
            $('#deleteConfirmModal').modal('hide');
            loadData(1);
            $('#successAlert h4').text('Movie deleted successfully!');
            $('#successAlert').slideDown();
            $('#successAlert').delay(2000).fadeOut();
          }
        }
      });
    });
    $('#btnCancelDelete').click(function(e) {
      $('#deleteConfirmModal').modal('hide');
    });
    $('#addMovieSubmit').click(function(e) {
      e.preventDefault();
      console.log('Add processing...');
      if(validateMovie()){
        $('#addMovieModal').modal('hide');
        $.ajax({
          type : 'POST',
          url : '/movies',
          data : $('#addMovieForm').serialize(),
          dataType : 'json',
          cache : false,
          error : function(err) {
            console.log('Error occurred : ' + err);
          },
          success : function(response) {
            console.log('Add success!');
            if(response.statusCode == 200 && response.message == 'SUCCESS') {
               clearModalFields();
               loadDataWithId(response._id);
               $('#successAlert h4').text('Movie added successfully!');
               $('#successAlert').slideDown();
               $('#successAlert').delay(2000).fadeOut();
            }
          }
        });

      } else {
        $('#addMovieModal').animate({ scrollTop: $('#movieError').offset().top }, 500);
      }
    });
    $('#updateMovieSubmit').click(function(e) {
      e.preventDefault();
      console.log('Update processing...');
      if(validateMovie()) {
        $('#addMovieModal').modal('hide');
        $.ajax({
          type : 'PUT',
          url : '/movies/' + $('#txtId').val(),
          data : $('#addMovieForm').serialize(),
          dataType : 'json',
          cache : false,
          error : function(err) {
            console.log('Error occurred : ' + err);
          },
          success : function(response) {
            console.log('Update success!');
            if(response.statusCode == 200 && response.message == 'SUCCESS') {
               clearModalFields();
               loadDataWithId(response._id);
               $('#successAlert h4').text('Movie updated successfully!');
               $('#successAlert').slideDown();
               $('#successAlert').delay(2000).fadeOut();
               $('.stars').stars();
            }
          }
        });

      } else {
        $('#addMovieModal').animate({ scrollTop: $('#movieError').offset().top }, 500);
      }
    });
    $('#successAlertHide').click(function(e) {
      e.preventDefault();
      $('#successAlert').slideUp();
    });
    $('#uploadTrigger').click(function(e) {
      e.preventDefault();
      //$('#txtMoviePoster').val();
      $('#uploadImageModal').modal('show');
    });
    $('#uploadImageForm').submit(function(e) {
      e.preventDefault();
      console.log('submit intercepted..');
      $(this).ajaxSubmit({
        error : function(err) {
          console.log('Error : '+err);
        },
        success : function(response) {
          console.log('successfully uploaded file : '+response);
          $('#uploadImageModal').modal('hide');
          $('#addFormPoster').attr('src',imagePath + response);
          $("#txtPoster").val(response);
        }
      });
    });
    //loadDataFromFile(0);
    loadData(1);
    $('.stars').stars();
    $('.alert').delay(2000).fadeOut();
});
