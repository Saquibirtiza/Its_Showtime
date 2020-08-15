import React, { useContext, useState, useEffect } from 'react';
import './Welcomepage.css';
import { Link } from 'react-scroll';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MovieContext } from '../Movielist/MovieListContext';
import MovieInfoPage from '../MovieInfo/MovieInfoPage';
// import { Link as LinkRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import image from '../../ss.png';
import { MdSearch } from 'react-icons/md';
import { Link as RouterLink } from 'react-router-dom';

function Welcomepage() {
  const [modalState, setModalState] = useState(false);
  const [movieID, setMovieID] = useState(false);
  const [movieReleaseDate, setMovieReleaseDate] = useState(false);
  const [width, setWidth] = useState();
  const bgRef = React.useRef();
  const [movies, setMovies, upcomingMovies, setUpcomingMovies] = useContext(
    MovieContext
  );

  useEffect(() => {
    setWidth(window.innerWidth);
  });
  window.addEventListener('resize', function () {
    setWidth(window.innerWidth);
  });

  const handleMovieInfoToggle = () => {
    setModalState(!modalState);
  };

  const pauseScrollSnap = () => {
    document.documentElement.style.scrollSnapType = 'none';
    setTimeout(function () {
      document.documentElement.style.scrollSnapType = 'y mandatory';
    }, 500);
  };

  const toggleModalState = (movie) => {
    setMovieID(movie.id);
    setMovieReleaseDate(movie.release_date);
    setModalState(!modalState);
  };

  useEffect(() => {
    if (modalState) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [modalState]);

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
      dots: false,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
    };
  } else {
    settings = {
      dots: false,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
    };
  }

  const changeBackground = (prop) => {
    // console.log(infoRef.current);
    bgRef.current.style.backgroundImage =
      'url(' +
      'https://image.tmdb.org/t/p/original/' +
      prop.backdrop_path +
      ')';

    bgRef.current.classList.add('backdrop');
    bgRef.current.classList.add('backdrop::before');
  };

  const handleTextFieldChange = (e) => {
    localStorage.setItem('searchVal', e.target.value);
  };

  return (
    <div>
      <div className={`modalBackground2 modalShowing2-${modalState}`}>
        <div className={'modalInner2'}>
          <MovieInfoPage
            ID={movieID}
            Release_date={movieReleaseDate}
            handleChange={handleMovieInfoToggle}
          />
        </div>
      </div>
      <div
        class='pageDev'
        style={{
          minHeight: '800px',
        }}>
        <div class='set'>
          <div class='textprop'>Welcome</div>
          <TextField
            style={{ width: '100%' }}
            id='filled-basic'
            label='Search for your favorite show'
            variant='standard'
            fullwidth
            onChange={handleTextFieldChange}
          />
          <RouterLink to='/result'>
            <a
              style={{
                position: 'absolute',
                cursor: 'pointer',
                fontSize: '35px',
                // right: '13%',
                textDecoration: 'none',
              }}>
              <MdSearch style={{ marginTop: '8px' }} />
            </a>
          </RouterLink>
        </div>
        <div class='scrollprop'>
          <Link
            onClick={() => pauseScrollSnap()}
            style={{ cursor: 'pointer' }}
            activeClass='active'
            to='trending'
            spy={true}
            smooth={true}
            duration={500}>
            <p>Scroll down</p>
          </Link>
        </div>
      </div>

      {/* -------------------------------------------------------------------------------------------------- */}
      <div ref={bgRef} class='trending'>
        <section id='trending'>
          <div>
            <div
              style={{
                width: '80%',
                margin: 'auto',
              }}>
              <h2 style={{ textAlign: 'left', paddingTop: '15px' }}>
                {' '}
                Trending
              </h2>

              <Slider {...settings}>
                {movies.map((movie) => (
                  <div
                    // style={{ height: '700px' }}
                    onMouseEnter={() => changeBackground(movie)}
                    onClick={() => toggleModalState(movie)}>
                    <img
                      src={
                        'https://image.tmdb.org/t/p/original/' +
                        movie.poster_path
                      }
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = image;
                      }}
                      alt='Poster'></img>
                    <h3 style={{ top: '325px' }} class='img__description'>
                      Vote Count: {movie.vote_count}
                    </h3>
                    <h3 class='img__description'>
                      Rating: {movie.vote_average}
                    </h3>
                    <h3>{movie.title}</h3>
                  </div>
                ))}
              </Slider>
              <h2 style={{ textAlign: 'left', paddingTop: '15px' }}>
                Upcoming Movies
              </h2>
              <Slider {...settings}>
                {upcomingMovies.map((movie) => (
                  <div
                    onMouseEnter={() => changeBackground(movie)}
                    onClick={() => toggleModalState(movie)}>
                    <img
                      src={
                        'https://image.tmdb.org/t/p/original/' +
                        movie.poster_path
                      }
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = image;
                      }}
                      alt='Poster'></img>
                    <h3 style={{ top: '325px' }} class='img__description'>
                      Vote Count: {movie.vote_count}
                    </h3>
                    <h3 class='img__description'>
                      Rating: {movie.vote_average}
                    </h3>
                    <h3>{movie.title}</h3>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </section>
      </div>
      <div
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

export default Welcomepage;
