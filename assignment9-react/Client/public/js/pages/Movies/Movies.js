var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Link = ReactRouter.Link;
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
module.exports = Container;
