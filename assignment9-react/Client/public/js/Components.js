/************************************
Script : React JS script
Description : Contains React components
Author : Sayanraj Guha
Copyright : All rights reserved.
*************************************/
$.fn.stars = function() {
    return this.each(function(i,e){
      $(e).html($('<span/>').width($(e).parent().find('.ratingData').text()*16));
    });
};
var { Router, Route, IndexRoute, Link, browserHistory } = ReactRouter;
var Movie = React.createClass({
  triggerUpdate : function(e) {
    this.props.triggerUpdate(e.target.value);
  },
  componentDidMount : function() {
    console.log('Movie component mounted');
    $('span.stars').stars();
  },
  componentDidUpdate : function(prevProps, prevState) {
    console.log(' Movie component did update');
    $('span.stars').stars();
  },
  render : function() {
    return (
      <div className="movieItem row">
        <div className="movieSelect col-lg-1">
        <div className={this.props.isDeleteTriggered ? "checkbox checkbox-danger show" : "checkbox checkbox-danger hide"} >
          <input type="checkbox" name="movieID" id="selectMovie" value={this.props.movie._id} />
          <label for="selectMovie" ></label>
        </div>
        </div>
        <div className="moviePoster col-lg-4">
          <img src={this.props.movie.Poster} id='posterImage' alt='Movie Poster' />
        </div>
        <div className="movieDetails col-lg-7">
          <div className="row">
            <div className="col-lg-11">
                <strong>{this.props.movie.Title}</strong>
            </div>
            <div className="col-lg-1">
                <a id="editTrigger" onClick={this.triggerUpdate}><span className="glyphicon glyphicon-pencil" value={this.props.movie._id}></span></a>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3">
              Release Year :
            </div>
            <div className="col-lg-9">
              {this.props.movie.Year}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3">
              Language :
            </div>
            <div className="col-lg-9">
              {this.props.movie.Language}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3">
              Genre :
            </div>
            <div className="col-lg-9">
              {this.props.movie.Genre}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3">
              Director :
            </div>
            <div className="col-lg-9">
              {this.props.movie.Director}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3">
              Writer :
            </div>
            <div className="col-lg-9">
              {this.props.movie.Writer}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3">
              Actors :
            </div>
            <div className="col-lg-9">
              {this.props.movie.Actors}
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-lg-3">
              Plot :
            </div>
            <div className="col-lg-9">
              {this.props.movie.Plot}
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-lg-3">
              Release Date :
            </div>
            <div className="col-lg-9">
              {this.props.movie.Released}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3">
              Runtime :
            </div>
            <div className="col-lg-9">
              {this.props.movie.Runtime}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3">
              Rating :
            </div>
            <div className="col-lg-9">
              <span className="ratingData" hidden>{this.props.movie.imdbRating}</span>
              <span className="stars">{this.props.movie.imdbRating}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3">
              Awards :
            </div>
            <div className="col-lg-9">
              {this.props.movie.Awards}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var NewMovie = React.createClass({
  render : function() {
    return (
      <div className={this.props.isNewMovie ? "movieItem row show" : "movieItem row hide"}>
        <div className="moviePoster col-lg-4">
          <img src={this.props.newMovie.Poster && this.props.newMovie.Poster.trim() != "" ? this.props.newMovie.Poster : '/images/image-placeholder.png' } id='posterImage' alt='Movie Poster' />
        </div>
        <form id="addMovieForm">
        <input type="hidden" name="_id" id="movieID" value={this.props.newMovie._id || '0'} />
        <input type="hidden" name="Poster" value={this.props.newMovie.Poster} />
        <div className="movieDetails col-lg-8">
          <div className="row">
            <div className="col-lg-12 editItem">
                <input type="text" className="form-control" defaultValue={this.props.newMovie.Title || ''}
                name="Title" id="txtTitle" title="Movie Title" placeholder="Title" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 editItem">
              <input type="number" className="form-control" name="Year" id="txtYear" placeholder="Release year" title="Release year" defaultValue={this.props.newMovie.Year || ''} />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 editItem">
              <input type="text" className="form-control" name="Language" id="txtLanguage" placeholder="Language" title="Language" defaultValue={this.props.newMovie.Language || ''}/>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 editItem">
              <input type="text" className="form-control" name="Genre" id="txtGenre" title="Genre" placeholder="Genre" defaultValue={this.props.newMovie.Genre || ''}/>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 editItem">
              <input type="text" className="form-control" name="Director" id="txtDirector" title="Director" placeholder="Director" defaultValue={this.props.newMovie.Director || ''}/>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 editItem">
              <input type="text" className="form-control" name="Writer" id="txtWriter" title="Writer" placeholder="Writer" defaultValue={this.props.newMovie.Writer || ''}/>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 editItem">
              <input type="text" className="form-control" name="Actors" id="txtActors" title="Actors" placeholder="Actors" defaultValue={this.props.newMovie.Actors || ''}/>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-lg-12 editItem">
              <textarea className="form-control" name="Plot" id="txtPlot" rows="5" title="Plot" placeholder="Plot" defaultValue={this.props.newMovie.Plot || ''}/>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-lg-12 editItem">
              <input type="text" className="form-control" name="Released" id="txtReleased" title="Release Year" placeholder="Release Year" defaultValue={this.props.newMovie.Released || ''}/>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 editItem">
              <input type="text" className="form-control" name="Runtime" id="txtRuntime" title="Run time" placeholder="Runtime" defaultValue={this.props.newMovie.Runtime || ''}/>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 editItem">
              <input type="number" step="0.1" min="0" max="10" className="form-control" name="imdbRating" id="txtRating" title="IMDB Rating" placeholder="Rating" defaultValue={this.props.newMovie.imdbRating || ''}/>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 editItem">
              <input type="text" className="form-control" name="Awards" id="txtAwards" title="Awards and Nominations" placeholder="Awards and Nominations" defaultValue={this.props.newMovie.Awards || ''}/>
            </div>
          </div>
        </div>
        <div className="row text-center editButtonGroup">
          <input type="button" className="btn btn-default editButtons" onClick={this.saveAction} name="Save" id="btnSave" value="Save" />
          <input type="button" className="btn btn-default editButtons" onClick={this.saveAction} name="Cancel" id="btnCancel" value="Cancel" />
        </div>
        </form>
      </div>
    );
  },
  saveAction : function(e) {
      if(e.target.value === 'Cancel') {
        this.props.saveAction(0,null,e.target.value);
      } else if(e.target.value === 'Save') {
        this.props.saveAction($('#movieID').val(),$('#addMovieForm').serialize(),e.target.value);
      }
  }
});

var AddMovie = React.createClass({
  render : function() {
    return (
      <div className="movieItem row show">
        <div className="moviePoster col-lg-4">
          <img src='/images/image-placeholder.png' id='posterImage' alt='Movie Poster' />
        </div>
        <form id="addMovieForm">
        <input type="hidden" name="Poster" value="" />
        <div className="movieDetails col-lg-8">
          <div className="row">
            <div className="col-lg-12 editItem">
                <input type="text" className="form-control"
                name="Title" id="txtTitle" title="Movie Title" placeholder="Title" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 editItem">
              <input type="number" className="form-control" name="Year" id="txtYear" placeholder="Release year" title="Release year" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 editItem">
              <input type="text" className="form-control" name="Language" id="txtLanguage" placeholder="Language" title="Language" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 editItem">
              <input type="text" className="form-control" name="Genre" id="txtGenre" title="Genre" placeholder="Genre"/>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 editItem">
              <input type="text" className="form-control" name="Director" id="txtDirector" title="Director" placeholder="Director"/>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 editItem">
              <input type="text" className="form-control" name="Writer" id="txtWriter" title="Writer" placeholder="Writer"/>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 editItem">
              <input type="text" className="form-control" name="Actors" id="txtActors" title="Actors" placeholder="Actors" />
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-lg-12 editItem">
              <textarea className="form-control" name="Plot" id="txtPlot" rows="5" title="Plot" placeholder="Plot"/>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-lg-12 editItem">
              <input type="text" className="form-control" name="Released" id="txtReleased" title="Release Year" placeholder="Release Year"/>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 editItem">
              <input type="text" className="form-control" name="Runtime" id="txtRuntime" title="Run time" placeholder="Runtime"/>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 editItem">
              <input type="number" step="0.1" min="0" max="10" className="form-control" name="imdbRating" id="txtRating" title="IMDB Rating" placeholder="Rating"/>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 editItem">
              <input type="text" className="form-control" name="Awards" id="txtAwards" title="Awards and Nominations" placeholder="Awards and Nominations"/>
            </div>
          </div>
        </div>
        <div className="row text-center editButtonGroup">
          <input type="button" className="btn btn-default editButtons" onClick={this.saveAction} name="Save" id="btnSave" value="Save" />
          <input type="button" className="btn btn-default editButtons" onClick={this.saveAction} name="Cancel" id="btnCancel" value="Cancel" />
        </div>
        </form>
      </div>
    );
  },
  saveAction : function(e) {

  }
});

var MovieList = React.createClass({
  showSelection : function() {
    this.props.deleteTrigger(!this.props.isDeleteTriggered);
  },
  deleteAction : function(e) {
    if(e.target.value === 'Cancel') {
      this.props.saveAction(0,null,e.target.value);
    } else if(e.target.value === 'Confirm') {
        this.props.deleteConfirm($('input[name="movieID"]:checked').serialize());
    }

  },
  render : function() {
    var rows=[];
    this.props.movies.forEach(function(movie) {
      rows.push(<Movie movie={movie} triggerUpdate={this.props.triggerUpdate} isDeleteTriggered={this.props.isDeleteTriggered} key={movie.Title} />)
    }.bind(this));
    return (
      <div className={this.props.isNewMovie ? "row movieList hide" : "row movieList show"}>
      <div className={this.props.isDeleteTriggered ? "row hide" : "row show"}>
        <a onClick={this.showSelection} className="pull-left deleteTrigger"><span className="glyphicon glyphicon-trash"></span></a>
      </div>
        {rows}
      <div className={this.props.isDeleteTriggered? "row text-center show" : "row text-center hide"}>
        <input type="button" className="btn btn-default editButtons" onClick={this.deleteAction} name="Confirm" id="btnConfirm" value="Confirm" />
        <input type="button" className="btn btn-default editButtons" onClick={this.deleteAction} name="Cancel" id="btnCancel" value="Cancel" />
      </div>
      </div>
    );
  }
});

var SearchSection = React.createClass({

  suggestions : function(title) {
    $.ajax({
      type : 'GET',
      url : this.props.suggestionPath + title,
      dataType : 'json',
      cache : false,
      error : function(err) {
        console.log('Error occurred : ' + err.message);
        console.log(err.error);
      }.bind(this),
      success : function(response) {
        if(response.hasOwnProperty('error')) {
          console.log('Error');
        } else {
          console.log('ajax success. reforming data');
          console.log(response);

          $( "#movie-complete" ).autocomplete({
              source: response.list,
              minLength: 0
          });
          $('#movie-complete').trigger("keydown");
          $('#movie-complete').trigger("focus");
        }
      }.bind(this)
    });
  },
  render : function() {
    return (
      <div className="row">
        <form className="">
          <div className="form-group ui-widget">
            <input type="text" placeholder="Start typing a movie name..." onChange={this.handleChange}
            name="movieTitle" className="form-control" id="movie-complete" defaultValue={this.props.searchTitle} />
          </div>
          <input type="button" value="Search" onClick={this.handleClick} className="form-control btn btn-primary" />
        </form>
      </div>
    );
  },
  componentDidUpdate : function() {
    $( "#movie-complete" ).autocomplete({
      source: [],
       minLength: 0
    });
  },
  componentDidMount : function() {
    $( "#movie-complete" ).autocomplete({
      source: [],
       minLength: 0
    });
    console.log('Search mounted');
  },
  handleChange : function() {
    var text = $('#movie-complete').val();
    if(text && text.trim() != '') {
      this.suggestions(text);
      //$('#movie-complete').autocomplete("search");
    }
  },
  handleClick : function() {
    this.props.searchAndSave($('#movie-complete').val());
  }
});

var Navbar = React.createClass({
  render : function() {
    return (

    <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="/">My To-Watch List</a>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            <li className="active"><Link to="/home" onClick={this.changeActiveLI}>Home</Link></li>
            <li id="moviesLink"><Link to="/movies" onClick={this.changeActiveLI}>Movies</Link></li>
            <li><Link to="/contact" onClick={this.changeActiveLI}>Contact</Link></li>
          </ul>
          <ul className="nav navbar-nav navbar-right show">
            <li><Link to="/login" onClick={this.changeActiveLI}>Login</Link></li>
          </ul>
        </div>
      </div>
    </nav>
    );
  },
  changeActiveLI : function(e) {
    $('#navbar ul li.active').removeClass('active');
    $(e.target).parent().addClass('active');
  }
});

var Container = React.createClass({
  getDefaultProps : function() {
    return {
      path : '/api/movies/',
      deletePath : '/api/movies?',
      suggestionPath : '/api/movies/imdb/',
      searchSavePath : '/api/movies'
    }
  },
  getInitialState : function() {
    return {
      searchTitle : '',
      movies : [],
      isNewMovie : false,
      newMovie : {},
      isDeleteTriggered : false
    }
  },
  loadMovies : function() {
    $.ajax({
      type : 'GET',
      url : this.props.path,
      dataType : 'json',
      cache : false,
      error : function(err) {
        console.log('Error occurred : ' + err.message);
        console.log(err.error);
      }.bind(this),
      success : function(response) {
        if(response.total == 0) {
          this.setState({
            movies : [],
            searchTitle : '',
            isNewMovie : false,
            newMovie : {}
          });
          $('.noMovieAlert').removeClass('hide');
          $('.noMovieAlert').addClass('show');
        } else {
          this.setState({
            movies : response.docs,
            searchTitle : '',
            isNewMovie : false,
            newMovie : {}
          });
        }
      }.bind(this)
    });
  },
  componentDidMount : function() {
    console.log('container component mounted');
    this.loadMovies();
    $('span.stars').stars();
    //setInterval(this.loadMovies, this.props.refreshInterval);
  },
  componentDidUpdate : function(prevProps, prevState) {
    console.log('component did update');
    if(prevState.movies && this.state.movies && prevState.movies.length == (this.state.movies.length-1) && prevState.movies.length != 0) {
      $('body').animate({ scrollTop: $('.movieList div.movieItem:last').offset().top }, 500);
    }
    $('span.stars').stars();
  },
  deleteTrigger : function(option) {
    this.setState( {
      isDeleteTriggered : true
    });
  },
  deleteConfirm : function(data) {
    console.log('Delete starting..');
    $.ajax({
      type : 'DELETE',
      url : this.props.deletePath + data,
      dataType : 'json',
      cache : false,
      error : function(err) {
        console.log('Error occurred : ' + err.message);
        console.log(err.error);
      }.bind(this),
      success : function(response) {
        if(response.hasOwnProperty('error')) {
          console.log('error');
        } else if(response.hasOwnProperty('statusCode') && response.statusCode == 200) {
          console.log('success');
          this.loadMovies();
          this.setState({
            isDeleteTriggered : false
          });
        }
      }.bind(this)
    });
  },
  searchAndSave : function(title) {
    console.log('Search and Save with title : ' + title);
    if(title && title.trim().length >= 1) {
      $.ajax({
        type : 'POST',
        url : this.props.suggestionPath + title,
        dataType : 'json',
        cache : false,
        error : function(err) {
          console.log('Error occurred : ' + err.message);
          console.log(err.error);
        }.bind(this),
        success : function(response) {
          console.log('ajax success. populating data');
          console.log(response);
          if(response.hasOwnProperty('error')) {
            console.log('error');
          } else {
            if(response.Response === "False") {
              //dispay alert movie not found
              $('.noMovieFoundAlert').removeClass('hide');
              $('.noMovieFoundAlert').slideDown();
              $('.noMovieFoundAlert').delay(2000).fadeOut();

              console.log('movie not found');
              this.setState({
                searchTitle : title,
                isNewMovie : false,
                newMovie : {}
              });
            } else {
              this.setState({
                searchTitle : title,
                isNewMovie : true,
                newMovie : response
              });
            }
          }
        }.bind(this)
      });
    }

  },
  saveAction : function(id,data,action) {
    if(action === 'Cancel') {
      this.setState({
        searchTitle : '',
        isNewMovie : false,
        newMovie : {},
        isDeleteTriggered : false
      });
    } else if(action === 'Save') {
      if(id === '0') {
        console.log('Adding movie');
        $.ajax({
          type : 'POST',
          data : data,
          url : this.props.searchSavePath,
          dataType : 'json',
          cache : false,
          error : function(err) {
            console.log('Error occurred : ' + err.message);
            console.log(err.error);
          }.bind(this),
          success : function(response) {
            console.log('ajax success. populating data');
            console.log(response);
            if(response == null || response == undefined || response.hasOwnProperty('error')) {
              console.log('error');
            } else if(response) {
              this.loadMovies();
            }
          }.bind(this)
        });
      } else {
        console.log('Updating movie');
        $.ajax({
          type : 'PUT',
          data : data,
          url : this.props.path + id,
          dataType : 'json',
          cache : false,
          error : function(err) {
            console.log('Error occurred : ' + err.message);
            console.log(err.error);
          }.bind(this),
          success : function(response) {
            console.log('ajax success. populating data');
            console.log(response);
            if(response == null || response == undefined || response.hasOwnProperty('error')) {
              console.log('error');
            } else if(response) {
              this.loadMovies();
            }
          }.bind(this)
        });
      }
    }
  },
  triggerUpdate : function(id) {
    console.log('Updating movie');
    $.ajax({
      type : 'GET',
      url : this.props.path + id,
      dataType : 'json',
      cache : false,
      error : function(err) {
        console.log('Error occurred : ' + err.message);
        console.log(err.error);
      }.bind(this),
      success : function(response) {
        console.log('ajax success. populating data');
        console.log(response);
        this.setState({
          searchTitle : '',
          isNewMovie : true,
          newMovie : response
        });
      }.bind(this)
    });
  },
  render : function() {
    return (
      <div>
        <div className='container'>
          { this.state.isNewMovie ?
            <NewMovie saveAction={this.saveAction} newMovie={this.state.newMovie} isNewMovie={this.state.isNewMovie} />
          :
            <div id="main">
              <SearchSection suggestionPath={this.props.suggestionPath} searchAndSave={this.searchAndSave} searchTitle={this.state.searchTitle} />
              <div className="alert alert-danger alert-block noMovieFoundAlert hide" role="alert">
                <span className="glyphicon glyphicon-shopping-cart"></span>
                {' '}
                <span id="caption">Movie Not Found</span>
              </div>
              {this.state.movies && this.state.movies.length >= 1 ?
                <MovieList triggerUpdate={this.triggerUpdate} saveAction={this.saveAction} deleteTrigger={this.deleteTrigger}
                deleteConfirm={this.deleteConfirm} isDeleteTriggered={this.state.isDeleteTriggered}
                isNewMovie={this.state.isNewMovie} movies={this.state.movies} />
                :
                <div className="alert alert-warning fade in noMovieAlert" role="alert">
                  <span className="glyphicon glyphicon-shopping-cart"></span>
                  {' '}
                  <span id="caption">You do not have any movies in your list</span>
                </div>
              }
            </div>
          }
        </div>
      </div>
    );
  }
});


var Contact = React.createClass( {
  render : function() {
    return (
      <div className="row">
        <div className="col-sm-6 col-sm-offset-3 form-box">
        	<div className="form-top">
        		<div className="form-top-left">
        			<h3>Contact us</h3>
            		<p>Fill in the form below to send us a message:</p>
        		</div>
        		<div className="form-top-right">
        			<i className="fa fa-envelope"></i>
        		</div>
            </div>
            <div className="form-bottom contact-form">
          <form role="form" method="post">
          	<div className="form-group">
          		<label className="sr-only" for="contact-email">Email</label>
              	<input type="email" name="email" placeholder="Email" className="contact-email form-control" id="contact-email" />
              </div>
              <div className="form-group">
              	<label className="sr-only" for="contact-subject">Subject</label>
              	<input type="text" name="subject" placeholder="Subject" className="contact-subject form-control" id="contact-subject" />
              </div>
              <div className="form-group">
              	<label className="sr-only" for="contact-message">Message</label>
              	<textarea name="message" placeholder="Message" className="contact-message form-control" id="contact-message"></textarea>
              </div>
              <button type="button" className="btn">Send message</button>
          </form>
        </div>
        </div>
    </div>
    );
  }
});

var Login = React.createClass( {
  render : function() {
    return (
      <div className="login">
      <div className="lbox">
           <div className="content">
              <div className="social">
                  <a className="circle github" href="/auth/github">
                      <i className="fa fa-github fa-fw"></i>
                  </a>
                  <a id="google_login" className="circle google" href="">
                      <i className="fa fa-google-plus fa-fw"></i>
                  </a>
                  <a id="facebook_login" className="circle facebook" href="">
                      <i className="fa fa-facebook fa-fw"></i>
                  </a>
                  <p className="caption">
                    Work In Progress
                  </p>
              </div>
              <div className="division">
                  <div className="line l"></div>
                    <span>or</span>
                  <div className="line r"></div>
              </div>
              <div className="error"></div>
              <div className="form loginBox">
                  <form method="post" action="" accept-charset="UTF-8">
                  <input id="email" className="form-control" type="text" placeholder="Email" name="email" />
                  <input id="password" className="form-control" type="password" placeholder="Password" name="password" />
                  <div className="text-center">
                    <input className="btn btn-success btn-login" type="button" value="Login" onclick="" />
                  </div>
                  </form>
              </div>
           </div>
      </div>
      <div className="lbox registerBox">
          <div className="content registerBox">
           <div className="form">
              <form method="post">
              <input id="email" className="form-control" type="email" placeholder="Email" name="email" />
              <input id="fName" className="form-control" type="text" placeholder="First Name" name="firstName" />
              <input id="lName" className="form-control" type="text" placeholder="Last Name" name="lastName" />
              <input id="password" className="form-control" type="password" placeholder="Password" name="password" />
              <input id="password_confirmation" className="form-control" type="password" placeholder="Confirm Password" name="password_confirmation" />
              <input className="btn btn-primary btn-register" type="submit" value="Create account" name="Register" />
              </form>
              </div>
          </div>
      </div>
      <div className="lbox">
        <div className="login-footer">
            <span>New user? {' '}
                 <a href="javascript:showRegisterForm()">Create an account!</a>
            ?</span>
        </div>
        <div className="register-footer">
             <span>Already have an account? {' '}</span>
             <a href="javascript:showLoginForm()">Login</a>
        </div>
      </div>
      </div>
    );
  }
});

var Home = React.createClass({
  changeLIActive : function() {
    $('#navbar ul li.active').removeClass('active');
    $('#moviesLink').addClass('active');
  },
  render : function() {
    return (
      <div className="site-wrapper">
        <div className="site-wrapper-inner">
          <div className="container box">
            <div className="inner cover">
              <h1 className="cover-heading">Cinema is a matter of what&#39;s in the frame; and what&#39;s out!</h1>
              <p className="lead">
                Let&#39;s make a To-Watch List
              </p>
              <p className="lead">
                <Link to="/movies" className="btn btn-lg btn-default" onClick={this.changeLIActive}>Start Here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var App = React.createClass( {
  render : function() {
    return (
      <div>
      <Navbar />
        {this.props.children}
      </div>
    )
  }
});

var browserHistory = ReactRouter.browserHistory;
ReactDOM.render(
  // <Container
  //   path='/api/movies/'
  //   deletePath='/api/movies?'
  //     suggestionPath='/api/movies/imdb/'
  //       searchSavePath = '/api/movies'
  //       refreshInterval={5000}
  // />
  <Router history={browserHistory}>
    <Route path="/" component={App} >
      <IndexRoute component={Home} />
      <Route path="home" component={Home} />
      <Route path="movies" component={Container} />
      <Route path="contact" component={Contact} />
      <Route path="login" component={Login} />
    </Route>
  </Router>
  ,
  document.getElementById('content')
);
