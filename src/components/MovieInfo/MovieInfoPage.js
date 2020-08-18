import React, { useState, useEffect, useRef } from 'react';
import '../../App.css';
import './MovieInfoPage.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import fire from '../../config/fbConfig';
import Signin from '../Navbar/Signin';
import Signup from '../Navbar/Signup';
import { Redirect } from 'react-router';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function MovieInfoPage({ ID, Release_date, handleChange }) {
  const classes = useStyles();
  const [movieDetails, setMovieDetails] = useState([]);
  const [movieID, setMovieID] = useState();
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [castDetails, setCastDetails] = useState([]);
  const [movieGenre, setGenre] = useState([]);
  const [existsInMylist, setExistsInMylist] = useState([]);
  const [completedToken, setCompletedToken] = useState(0);
  const [castNum, setCastNum] = useState(1);
  const [suggestedNum, setSuggestedNum] = useState(1);
  const [width, setWidth] = useState();
  const [checkDate, setCheckDate] = useState();
  const [signinToken, setSignin] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(0);
  const [modalSigninState, setSigninModalState] = useState(false);
  const bgRef = React.useRef();
  const tab1 = React.useRef();
  const tab2 = React.useRef();
  const tab3 = React.useRef();
  const addButton = React.useRef();
  const removeButton = React.useRef();
  const spinnerRef = React.useRef();

  const handleWatched = (id, runtime) => {
    fire.auth().onAuthStateChanged(function (user) {
      if (user) {
        const docRef = fire
          .firestore()
          .collection('Users')
          .doc(`${user.uid}`)
          .collection('Watched')
          .doc(`${id}`);
        docRef
          .set({
            WatchedID: id,
            WatchedRuntime: runtime,
          })
          .then(function () {
            console.log('Watched List Added');
          })
          .catch(function (error) {
            console.log(error);
          });
        const anotherDocRef = fire
          .firestore()
          .collection('Users')
          .doc(`${user.uid}`)
          .collection('Movies')
          .doc(`${id}`);
        if (anotherDocRef) {
          anotherDocRef.update({
            MovieCompleted: '1',
          });
        }
      } else {
        setSignin(true);
        toggleSigninModalState();
      }
    });
  };

  const handleSubmit = (
    id,
    title,
    rating,
    vote_count,
    poster,
    release_date
  ) => {
    var user = fire.auth().currentUser;
    if (user) {
      const docRef = fire
        .firestore()
        .collection('Users')
        .doc(`${user.uid}`)
        .collection('Movies')
        .doc(`${id}`);
      if (Release_date) {
        docRef
          .set({
            MovieID: id,
            MovieTitle: title,
            MovieRating: rating,
            MovieVoteCount: vote_count,
            MoviePoster: poster,
            MovieCompleted: completedToken,
            MovieRelease: Release_date,
          })
          .then(function () {
            console.log('Added');
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        docRef
          .set({
            MovieID: id,
            MovieTitle: title,
            MovieRating: rating,
            MovieVoteCount: vote_count,
            MoviePoster: poster,
            MovieCompleted: completedToken,
            MovieRelease: release_date,
          })
          .then(function () {
            console.log('Added');
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    } else {
      setSignin(true);
      toggleSigninModalState();
    }
  };

  const removeMylist = (id) => {
    var user = fire.auth().currentUser;
    if (user) {
      const docRef = fire
        .firestore()
        .collection('Users')
        .doc(`${user.uid}`)
        .collection('Movies');
      docRef.get().then((data) => {
        data.forEach((doc) => {
          console.log(id);
          if (doc.data().MovieID == id) {
            doc.ref.delete();
            console.log('Deleted');
          }
        });
      });
    } else {
      console.log('Not signed in');
    }
  };

  const removeWatched = (id) => {
    fire.auth().onAuthStateChanged(function (user) {
      if (user) {
        const docRef = fire
          .firestore()
          .collection('Users')
          .doc(`${user.uid}`)
          .collection('Watched');
        docRef.get().then((data) => {
          data.forEach((doc) => {
            if (doc.data().WatchedID == id) {
              doc.ref.delete();
              console.log('Deleted');
            }
          });
        });
        const anotherDocRef = fire
          .firestore()
          .collection('Users')
          .doc(`${user.uid}`)
          .collection('Movies')
          .doc(`${id}`);
        if (anotherDocRef) {
          anotherDocRef.update({
            MovieCompleted: 0,
          });
        }
      } else {
        console.log('Not signed in');
      }
    });
  };

  useEffect(() => {
    setWidth(window.innerWidth);
  });

  useEffect(() => {
    switchTab();
  }, [width]);

  let settings = {};
  if (width < 850) {
    settings = {
      dots: false,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
  } else if (width < 1050) {
    settings = {
      dots: false,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 2,
    };
  } else if (width < 1400) {
    settings = {
      dots: true,
      arrows: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
    };
  } else {
    settings = {
      dots: true,
      arrows: true,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 5,
    };
  }

  const callback = () => {
    handleChange();
    setMovieID(undefined);
  };

  const switchTab = (no) => {
    var path =
      'url(https://image.tmdb.org/t/p/original/' +
      movieDetails.backdrop_path +
      ')';

    if (no === 2) {
      if (movieDetails.backdrop_path) {
        bgRef.current.style.backgroundImage =
          'linear-gradient(to top, black 30%, transparent), ' + path;
      } else {
        bgRef.current.style.backgroundImage = '';
        bgRef.current.classList.remove('default1');
        bgRef.current.classList.remove('default3');
        bgRef.current.classList.add('default2');
      }
      tab1.current.style.opacity = 0;
      tab1.current.style.zIndex = 3;
      tab2.current.style.opacity = 1;
      tab2.current.style.zIndex = 8;
      tab3.current.style.opacity = 0;
      tab3.current.style.zIndex = 3;
    } else if (no === 3) {
      if (movieDetails.backdrop_path) {
        bgRef.current.style.backgroundImage =
          'linear-gradient(to top, black 15%, transparent), ' + path;
      } else {
        bgRef.current.style.backgroundImage = '';
        bgRef.current.classList.remove('default2');
        bgRef.current.classList.remove('default1');
        bgRef.current.classList.add('default3');
      }
      tab1.current.style.opacity = 0;
      tab1.current.style.zIndex = 3;
      tab2.current.style.opacity = 0;
      tab2.current.style.zIndex = 3;
      tab3.current.style.opacity = 1;
      tab3.current.style.zIndex = 8;
    } else {
      if (movieDetails.backdrop_path && width <= 1184) {
        bgRef.current.style.backgroundImage =
          'linear-gradient(to top, black 30%, transparent), ' + path;
      } else if (movieDetails.backdrop_path && width > 1184) {
        bgRef.current.style.backgroundImage =
          'linear-gradient(to right, black 25%, transparent), ' + path;
      } else {
        bgRef.current.style.backgroundImage = '';
        bgRef.current.classList.remove('default2');
        bgRef.current.classList.remove('default3');
        bgRef.current.classList.add('default1');
      }

      tab1.current.style.opacity = 1;
      tab1.current.style.zIndex = 8;
      tab2.current.style.opacity = 0;
      tab2.current.style.zIndex = 3;
      tab3.current.style.opacity = 0;
      tab3.current.style.zIndex = 3;
    }
  };

  useEffect(() => {
    tab1.current.style.opacity = 1;
    tab1.current.style.zIndex = 8;
    tab2.current.style.opacity = 0;
    tab2.current.style.zIndex = 3;
    tab3.current.style.opacity = 0;
    tab3.current.style.zIndex = 3;

    if (ID !== false) {
      if (movieID) ID = movieID;

      fire.auth().onAuthStateChanged(function (user) {
        if (user) {
          const docRef = fire
            .firestore()
            .collection('Users')
            .doc(`${user.uid}`)
            .collection('Watched');
          docRef.onSnapshot((data) => {
            var flag = 0;
            data.forEach((doc) => {
              if (doc.data().WatchedID == ID) {
                flag = 1;
                setCompletedToken(1);
              }
            });
            if (flag == 0) {
              setCompletedToken(0);
            }
          });
        } else {
          console.log('Not signed in');
        }
      });

      fetch(
        `https://api.themoviedb.org/3/movie/${ID}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
      )
        .then((response) => response.json())
        .then((res) => {
          setMovieDetails(res);
          var genrearr = '';
          res.genres.forEach((element) => {
            genrearr = genrearr + element.name + ', ';
          });
          genrearr = genrearr.slice(0, -2);
          setGenre(genrearr);
        });

      fetch(
        `https://api.themoviedb.org/3/movie/${ID}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      )
        .then((response) => response.json())
        .then((res) => {
          var count = 0;
          res.cast.forEach((doc) => {
            if (doc.profile_path) {
              count = count + 1;
            }
          });
          if (count == 0) {
            setCastNum(0);
          } else {
            setCastNum(1);
          }
          setCastDetails(res.cast);
        });

      fetch(
        `https://api.themoviedb.org/3/movie/${ID}/similar?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`
      )
        .then((response) => response.json())
        .then((res) => {
          var count2 = 0;
          res.results.forEach((doc) => {
            count2 = count2 + 1;
          });
          if (count2 == 0) {
            setSuggestedNum(0);
          } else {
            setSuggestedNum(1);
          }
          setRelatedMovies(res.results);
        });
    }

    fire.auth().onAuthStateChanged(function (user) {
      if (user) {
        const docRef = fire
          .firestore()
          .collection('Users')
          .doc(`${user.uid}`)
          .collection('Movies');
        docRef.onSnapshot((data) => {
          var flag = 0;

          data.forEach((doc) => {
            if (doc.data().MovieID == ID) {
              flag = 1;
              setExistsInMylist(1);
            }
          });
          if (flag == 0) {
            setExistsInMylist(0);
          }
        });
      }
    });
  }, [ID, movieID]);

  useEffect(() => {
    bgRef.current.classList.add('backdropcomponent');
    if (movieDetails.backdrop_path) {
      var path =
        'url(https://image.tmdb.org/t/p/original/' +
        movieDetails.backdrop_path +
        ')';
      bgRef.current.style.backgroundImage =
        'linear-gradient(to right, black 15%, transparent), ' + path;
    } else {
      bgRef.current.style.backgroundImage = '';
      bgRef.current.classList.remove('default2');
      bgRef.current.classList.remove('default3');
      bgRef.current.classList.add('default1');
    }
  }, [movieDetails]);

  const toggleModalState = () => {
    setModalState(!modalState);
  };

  const toggleSigninModalState = () => {
    setSigninModalState(!modalSigninState);
  };

  return (
    <div ref={bgRef}>
      {isSignedUp == 1 ? <Redirect to='/loading' /> : null}
      {signinToken ? (
        <div>
          <div className={`modalBackground modalShowing-${modalState}`}>
            <div className={'modalInner'}>
              <Signup
                handleExit={(val) => {
                  toggleModalState();
                  if (val == 1) {
                    setIsSignedUp(1);
                  }
                }}
                handleSwitch={() => {
                  toggleModalState();
                  toggleSigninModalState();
                }}
              />
            </div>
          </div>

          <div className={`modalBackground modalShowing-${modalSigninState}`}>
            <div className={'modalInner'}>
              <Signin
                handleExit={() => {
                  toggleSigninModalState();
                  callback();
                }}
                handleSwitch={() => {
                  toggleModalState();
                  toggleSigninModalState();
                }}
              />
            </div>
          </div>
        </div>
      ) : null}
      {/* ---------------------------------------------------------------Overview Tab--------------------------------------------------------------- */}
      <div ref={tab1} class='modal'>
        <div class='info'>
          <div class='leftsection'>
            <div class='title'>{movieDetails.title}</div>
            <div class='genrestyle'>{movieGenre}</div>
            <div class='overview'>{movieDetails.overview}</div>
            <div style={{ display: 'flex', textDecoration: 'underline' }}>
              <div class='anotherstats'>Runtime</div>
              <div class='moviestats'>Rating</div>
              <div class='anotherstats'>Release Date</div>
            </div>
            <div style={{ display: 'flex' }}>
              {movieDetails.runtime == 0 ? (
                <div class='anotherstats'>N/A</div>
              ) : (
                <div class='anotherstats'>{movieDetails.runtime} minutes</div>
              )}

              {movieDetails.vote_average == 0 ? (
                <div class='moviestats'>N/A</div>
              ) : (
                <div class='moviestats'>{movieDetails.vote_average}</div>
              )}

              {Release_date ? (
                <div class='anotherstats'>{Release_date}</div>
              ) : (
                <div class='anotherstats'>{movieDetails.release_date}</div>
              )}
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              <div style={{ flex: '1', minWidth: '200px' }}>
                {existsInMylist == 0 ? (
                  <Button
                    ref={addButton}
                    onClick={() =>
                      handleSubmit(
                        movieDetails.id,
                        movieDetails.title,
                        movieDetails.vote_average,
                        movieDetails.vote_count,
                        movieDetails.poster_path,
                        movieDetails.release_date
                      )
                    }
                    type='button'
                    variant='contained'
                    color='primary'
                    className={classes.submit}>
                    Add to Mylist
                  </Button>
                ) : (
                  <Button
                    onClick={() => removeMylist(movieDetails.id)}
                    ref={removeButton}
                    type='button'
                    variant='contained'
                    color='primary'
                    className={classes.submit}>
                    Remove From Mylist
                  </Button>
                )}
              </div>
              <div style={{ flex: '1', minWidth: '200px' }}>
                {completedToken ? (
                  <Button
                    ref={addButton}
                    onClick={() => removeWatched(movieDetails.id)}
                    type='button'
                    variant='contained'
                    color='primary'
                    className={classes.submit}>
                    Mark as UnWatched
                  </Button>
                ) : (
                  <Button
                    onClick={(e) => {
                      var currdate = new Date();
                      if (Release_date) var otherdate = new Date(Release_date);
                      else var otherdate = new Date(movieDetails.release_date);
                      if (currdate < otherdate) {
                        console.log(currdate, otherdate);
                        alert(
                          'This Movie Hasnt Been Released In Your Area Yet'
                        );
                      } else {
                        handleWatched(movieDetails.id, movieDetails.runtime);
                      }
                    }}
                    ref={removeButton}
                    type='button'
                    variant='contained'
                    color='primary'
                    className={classes.submit}>
                    Mark as Watched
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div class='blank'></div>
      </div>
      {/* ---------------------------------------------------------------Cast Tab--------------------------------------------------------------- */}
      <div
        ref={tab2}
        style={{
          opacity: '0',
          position: 'absolute',
          bottom: '80px',
          left: '0px',
          right: '0px',
        }}>
        <h1 style={{ color: 'white', textAlign: 'left', marginLeft: '5vw' }}>
          Cast and Crew
        </h1>
        {castNum ? (
          <Slider {...settings}>
            {castDetails.map((cast) => {
              if (cast.profile_path) {
                return (
                  <div>
                    <img
                      src={
                        'https://image.tmdb.org/t/p/original/' +
                        cast.profile_path
                      }
                      alt='Poster'></img>
                    <h3 style={{ color: 'white' }}>{cast.name}</h3>
                    <h3 style={{ color: 'grey' }}>as "{cast.character}"</h3>
                  </div>
                );
              }
            })}
          </Slider>
        ) : (
          <h3 style={{ height: '100px', color: 'white' }}>
            No Cast Data Available
          </h3>
        )}
      </div>

      {/* ---------------------------------------------------------------Similar Movie Tab--------------------------------------------------------------- */}
      <div
        ref={tab3}
        style={{
          opacity: '0',
          position: 'absolute',
          bottom: '80px',
          left: '0px',
          right: '0px',
        }}>
        <h1 style={{ color: 'white', textAlign: 'left', marginLeft: '5vw' }}>
          Movies Similar To This
        </h1>
        {suggestedNum ? (
          <Slider {...settings}>
            {relatedMovies.map((related) => {
              if (related.poster_path) {
                return (
                  <div
                    onClick={() => {
                      ID = related.id;
                      setMovieID(related.id);
                    }}>
                    <img
                      src={
                        'https://image.tmdb.org/t/p/original/' +
                        related.poster_path
                      }
                      alt='Poster'></img>
                    <h3 style={{ color: 'white' }}>{related.title}</h3>
                    <h3 style={{ top: '325px' }} class='img__description'>
                      Vote Count: {related.vote_count}
                    </h3>
                    <h3 class='img__description'>
                      Rating: {related.vote_average}
                    </h3>
                  </div>
                );
              }
            })}
          </Slider>
        ) : (
          <h3 style={{ height: '100px', color: 'white' }}>
            No Suggested Movies Available
          </h3>
        )}
      </div>

      <nav class='navposition'>
        <ul class={'nav-links2'}>
          <li>
            <div
              style={{ cursor: 'pointer', padding: '2px', color: 'white' }}
              onClick={() => switchTab(1)}>
              Overview
            </div>
          </li>
          <li>
            <div
              style={{
                cursor: 'pointer',
                padding: '2px',
                color: 'white',
              }}
              onClick={() => switchTab(2)}>
              Cast
            </div>
          </li>
          <li>
            <div
              style={{ cursor: 'pointer', padding: '2px', color: 'white' }}
              onClick={() => switchTab(3)}>
              Suggestions
            </div>
          </li>
        </ul>
      </nav>

      <div class='buttonposition cross' onClick={() => callback()}>
        <div class='line1'></div>
        <div class='line2'></div>
      </div>
    </div>
  );
}

export default MovieInfoPage;
