import React, { useContext, useState, useEffect } from 'react';
import MovieInfoPage from '../MovieInfo/MovieInfoPage';
import '../SearchResult/SearchResult.css';
import fire from '../../config/fbConfig';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import './DashBoard.css';
import image from '../../ss.png';

function DashBoard() {
  const [modalState, setModalState] = useState(false);
  const [movieID, setMovieID] = useState(false);
  const [movie, setMovie] = React.useState([]);
  const [totalRuntime, setTotalRuntime] = React.useState(0);
  const [totalMovies, setTotalMovies] = React.useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [pageLimit, setPageLimit] = useState(100);
  const [noData, setNoData] = useState(0);
  const [releaseDate, setReleaseDate] = useState(0);
  const [noFinished, setNoFinished] = useState(0);
  const [nextUpcoming, setNextUpcoming] = useState('');
  const [nextUpcomingDays, setNextUpcomingDays] = useState(100000);
  const modalBg = React.useRef();
  const overlayBg = React.useRef();
  const [width, setWidth] = useState();

  let settings = {};
  if (width < 850) {
    settings = {
      dots: false,
      arrows: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
  } else if (width < 1050) {
    settings = {
      dots: false,
      arrows: true,
      infinite: false,
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
      dots: false,
      arrows: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
    };
  }

  useEffect(() => {
    setWidth(window.innerWidth);
  });

  window.addEventListener('resize', function () {
    setWidth(window.innerWidth);
  });

  const handleScroll = () => {
    const position = window.pageYOffset;
    var bottom = document.getElementById('footer').getBoundingClientRect()
      .bottom;

    if (bottom > window.innerHeight) {
      modalBg.current.style.top = `${position}px`;
      setScrollPosition(position);
    } else {
      window.scrollBy(0, -(window.innerHeight - bottom + 2));
    }
  };

  const handleResize = () => {
    const position = window.pageYOffset;
    var bottom = document.getElementById('footer').getBoundingClientRect()
      .bottom;
    console.log(window.innerHeight);
    if (bottom < window.innerHeight) {
      window.scrollBy(0, -(window.innerHeight - bottom + 2));
      setScrollPosition(window.innerHeight);
    }
  };

  useEffect(() => {
    if (modalState) {
      document.body.style.overflow = 'hidden';
      modalBg.current.style.overflowY = 'scroll';
    } else {
      document.body.style.overflow = '';
    }
  }, [modalState]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const timeConvert = (n) => {
    var num = n;
    var hours = num / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + ' hour(s) ' + rminutes + ' minute(s).';
  };

  useEffect(() => {
    handleScroll();
    fire.auth().onAuthStateChanged(function (user) {
      if (user) {
        setMovie([]);
        const docRef = fire
          .firestore()
          .collection('Users')
          .doc(`${user.uid}`)
          .collection('Movies');
        docRef.onSnapshot((data) => {
          var temp = [];
          var date2 = new Date();
          var flag = 0;
          var temp2 = 100000;
          var isAvailable = 0;
          var finished = 0;
          data.forEach((doc) => {
            if (doc.data().MovieCompleted) {
              finished = finished + 1;
            } else {
              isAvailable = isAvailable + 1;
            }

            var date1 = new Date(doc.data().MovieRelease);
            const diffTime = date1 - date2;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays >= 0 && diffDays <= temp2) {
              temp2 = diffDays;
              flag = 1;
              setNextUpcoming(doc.data().MovieTitle);
              setNextUpcomingDays(diffDays);
            }
            temp.push(doc.data());
          });

          if (finished == 0) {
            setNoFinished(1);
          } else {
            setNoFinished(0);
          }
          if (isAvailable == 0) {
            setNoData(1);
          } else {
            setNoData(0);
          }
          if (flag == 0) {
            setNextUpcoming('');
            setNextUpcomingDays(100000);
          }
          setMovie(temp);
        });

        const anotherDocRef = fire
          .firestore()
          .collection('Users')
          .doc(`${user.uid}`)
          .collection('Watched');
        anotherDocRef.onSnapshot((data) => {
          var count = 0;
          var total = 0;
          data.forEach((doc) => {
            total = total + doc.data().WatchedRuntime;
            count = count + 1;
          });
          setTotalMovies(count);
          setTotalRuntime(timeConvert(total));
        });
      } else {
        console.log('Not signed in');
      }
    });
  }, []);

  const toggleModalState = (movie) => {
    setMovieID(movie.MovieID);
    setReleaseDate(movie.MovieRelease);
    setModalState(!modalState);
  };

  const handleMovieInfoToggle = () => {
    setModalState(!modalState);
    setTimeout(function () {
      handleResize();
    }, 200);
  };

  return (
    <div class='overall'>
      <div
        ref={modalBg}
        style={{ top: '0', height: '100%' }}
        className={`modalBackground2 modalShowing2-${modalState}`}>
        <div
          style={{
            height: '900px',
            marginTop: '40px',
            transform: 'translate(0, 0px)',
            marginBottom: '20px',
          }}
          className={'modalInner2'}>
          <MovieInfoPage
            ID={movieID}
            Release_date={releaseDate}
            handleChange={handleMovieInfoToggle}
          />
        </div>
      </div>

      <div
        style={{
          width: '80%',
          margin: 'auto',
        }}>
        <h2>
          <div class='stats'>
            <div class='stats2'>
              <div style={{ color: 'rgb(255, 230, 0)' }}>
                Next Unreleased Movie In My List:
              </div>
              {nextUpcoming ? <div>{nextUpcoming}</div> : <div>None</div>}

              {nextUpcomingDays != 100000 ? (
                <div>releasing in {nextUpcomingDays} days</div>
              ) : null}
            </div>
            <div class='stats2'>
              <div style={{ color: 'rgb(255, 230, 0)' }}>Total Movie Time:</div>
              <div>{totalRuntime}</div>
            </div>
            <div class='stats2'>
              <div style={{ color: 'rgb(255, 230, 0)' }}>Movies Watched:</div>
              <div>{totalMovies}</div>
            </div>
          </div>
        </h2>

        <h2 style={{ textAlign: 'center', padding: '15px' }}>
          Movies Yet to Watch
        </h2>
        {noData ? (
          <h3 style={{ height: '200px' }}>
            No Movies In Your Watchlist. Add Movies To Show Here
          </h3>
        ) : (
          <Slider {...settings}>
            {movie.map((movie) => {
              if (!movie.MovieCompleted) {
                return (
                  <div
                    onClick={() => {
                      toggleModalState(movie);
                      handleScroll();
                    }}>
                    <img
                      src={
                        'https://image.tmdb.org/t/p/original/' +
                        movie.MoviePoster
                      }
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = image;
                      }}
                      alt='Poster'></img>
                    {movie.MovieRating == 0 ? (
                      <h3 style={{ top: '325px' }} class='img__description'>
                        Vote Count: N/A
                      </h3>
                    ) : (
                      <h3 style={{ top: '325px' }} class='img__description'>
                        Vote Count: {movie.MovieRating}
                      </h3>
                    )}
                    {movie.MovieVoteCount == 0 ? (
                      <h3 class='img__description'>Rating: N/A</h3>
                    ) : (
                      <h3 class='img__description'>
                        Rating: {movie.MovieVoteCount}
                      </h3>
                    )}
                    <h3>{movie.MovieTitle}</h3>
                  </div>
                );
              }
            })}
          </Slider>
        )}
        <h2 style={{ textAlign: 'center', padding: '15px' }}>
          Favorite Movies You Have Watched
        </h2>
        {noFinished ? (
          <h3 style={{ height: '200px' }}>
            You Have Watched None Of Your Favorite Movies.
          </h3>
        ) : (
          <Slider {...settings}>
            {movie.map((movie) => {
              if (movie.MovieCompleted) {
                return (
                  <div
                    onClick={() => {
                      toggleModalState(movie);
                      handleScroll();
                    }}>
                    <img
                      src={
                        'https://image.tmdb.org/t/p/original/' +
                        movie.MoviePoster
                      }
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = image;
                      }}
                      alt='Poster'></img>
                    <h3 style={{ top: '325px' }} class='img__description'>
                      Vote Count: {movie.MovieRating}
                    </h3>
                    <h3 class='img__description'>
                      Rating: {movie.MovieVoteCount}
                    </h3>
                    <h3>{movie.MovieTitle}</h3>
                  </div>
                );
              }
            })}
          </Slider>
        )}
      </div>
      <div
        id='footer'
        style={{
          height: '200px',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        }}>
        <div>
          <a
            style={{ color: 'white' }}
            href='https://pngtree.com/so/style-icons'>
            "style-icons png" from pngtree.com
          </a>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
