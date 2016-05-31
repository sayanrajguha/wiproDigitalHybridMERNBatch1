// Empty JS for your own code to be here

/******************************************
Global Funcions
*******************************************/
const imagePath = '/images/';
const imagePlaceHolderPath = '/images/image-placeholder.png';
$.fn.stars = function() {
    return this.each(function(i,e){$(e).html($('<span/>').width($(e).text()*16));});
};
/*******************************************
Post DOM load functions
*******************************************/
$(function() {
  var globalMovieSet = [];
  var globalCounter = 0;
  function loadModule(data,index) {
    if(data && index >= 0 && index < data.length) {
      var module = data[index];
      //console.log(module);
      globalCounter = index;
      console.log('poster : ' + module.Poster);
      if(module.Poster != "") {
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
      $("#txtId").val(module.id);
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
  function loadDataFromFile(index) {
    $.get("/movie/getFile",function(data) {
      if(data == null || data == undefined || data.length == 0 || data.length == undefined) {
        console.log('Empty file');
        $('#myEmptyJumboTron').show();
        $('#main').hide();
      } else {
        console.log('File contents found');
        $('#myEmptyJumboTron').hide();
        $('#main').show();
        globalMovieSet = data;
        console.log('Data loaded. Length : '+globalMovieSet.length);
        if(globalMovieSet && globalMovieSet.length == 1) {
          $('#loadPrev').parent().addClass('disabled');
          $('#loadNext').parent().addClass('disabled');
        } else {
          $('#loadPrev').parent().removeClass('disabled');
          $('#loadNext').parent().removeClass('disabled');
        }
        if(globalMovieSet.length > 0 && index >= 0) {
          loadModule(globalMovieSet,index);
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
      --globalCounter;
      if(globalCounter < 0) {
        globalCounter = globalMovieSet.length - 1;
      }
      console.log('Counter : '+globalCounter);
      loadModule(globalMovieSet,globalCounter);
    });
    $('#loadNext').click(function(e) {
      e.preventDefault();
      console.log('Next clicked!');
      ++globalCounter;
      if(globalCounter >= globalMovieSet.length) {
        globalCounter = 0;
      }
      console.log('Counter : '+globalCounter);
      loadModule(globalMovieSet,globalCounter);
    });
    $('.btnAdd').click(function(e) {
      e.preventDefault();
      if(globalMovieSet && globalMovieSet.length >= 1) {
        $('#txtId').val(parseInt(globalMovieSet[globalMovieSet.length-1].id)+1);
      } else {
        $('#txtId').val('0');
      }
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
      loadModuleInPopup(globalMovieSet[globalCounter]);
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
      //console.log(globalCounter);
      var data = {index : globalCounter};
      $.post('/movie/deleteMovie',data,function(data) {
        if(data && data == 'success') {
          $('#deleteConfirmModal').modal('hide');
           loadDataFromFile(-1);
           $('#loadNext').click();
          $('#successAlert h4').text('Movie deleted successfully!');
          $('#successAlert').slideDown();
          $('#successAlert').delay(2000).fadeOut();
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
        $.post('/movie/addMovie',$('#addMovieForm').serialize(),function(data) {
          if(data && data == 'success') {
            clearModalFields();
            loadDataFromFile(globalMovieSet.length);
            $('#successAlert h4').text('Movie added successfully!');
            $('#successAlert').slideDown();
            $('#successAlert').delay(2000).fadeOut();
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
        $.post('/movie/updateMovie', $('#addMovieForm').serialize(),function(data) {
          if(data && data == 'success') {
             clearModalFields();
             loadDataFromFile(globalCounter);
             $('#successAlert h4').text('Movie updated successfully!');
             $('#successAlert').slideDown();
             $('#successAlert').delay(2000).fadeOut();
             $('.stars').stars();
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
    loadDataFromFile(0);
    $('.stars').stars();
    $('.alert').delay(2000).fadeOut();
});
