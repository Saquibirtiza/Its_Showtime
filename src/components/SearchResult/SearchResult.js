import React, { useContext, useState, useEffect } from 'react';
import MovieInfoPage from '../MovieInfo/MovieInfoPage';
import './SearchResult.css';
import image from '../../ss.png';

function SearchBar() {
  const [modalState, setModalState] = useState(false);
  const [movieID, setMovieID] = useState(false);
  const [movie, setMovie] = React.useState([]);
  const [seachResult, setSeachResult] = React.useState(1);
  const [scrollPosition, setScrollPosition] = useState(0);
  const modalBg = React.useRef();

  const handleScroll = () => {
    const position = window.pageYOffset;
    var bottom = document.getElementById('footer').getBoundingClientRect()
      .bottom;

    if (bottom > window.innerHeight) {
      console.log(bottom, window.innerHeight);
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
    window.addEventListener('scroll', handleScroll, handleResize, {
      passive: true,
    });
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    handleScroll();
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${
        process.env.REACT_APP_TMDB_API_KEY
      }&language=en-US&query=${localStorage.getItem(
        'searchVal'
      )}&page=1&include_adult=false`
    )
      .then((response) => response.json())
      .then((res) => {
        setMovie(res.results);
        var count = 0;
        res.results.forEach((doc) => {
          count = count + 1;
        });
        if (count == 0) {
          setSeachResult(0);
        } else {
          setSeachResult(1);
        }
      });
  }, [localStorage.getItem('searchVal')]);

  const toggleModalState = (movie) => {
    setMovieID(movie.id);
    setModalState(!modalState);
  };

  const handleMovieInfoToggle = () => {
    setModalState(!modalState);
  };

  return (
    <div>
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
          <MovieInfoPage ID={movieID} handleChange={handleMovieInfoToggle} />
        </div>
      </div>
      <div class='contain overall2'>
        <div style={{ paddingBottom: '200px' }}>
          <h1 style={{ textAlign: 'left', padding: '50px' }}>Search Results</h1>
          {seachResult ? (
            <div class='grid-row'>
              {movie.map((movie) => (
                <div
                  class='grid-item'
                  onClick={() => {
                    toggleModalState(movie);
                    handleScroll();
                  }}>
                  <img
                    class='img-style'
                    src={
                      'https://image.tmdb.org/t/p/original/' + movie.poster_path
                    }
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = image;
                    }}
                    alt='Poster'></img>
                  {movie.vote_count == 0 ? (
                    <h3 style={{ top: '325px' }} class='img__description'>
                      Vote Count: N/A
                    </h3>
                  ) : (
                    <h3 style={{ top: '325px' }} class='img__description'>
                      Vote Count: {movie.vote_count}
                    </h3>
                  )}
                  {movie.vote_average == 0 ? (
                    <h3 class='img__description'>Rating: N/A</h3>
                  ) : (
                    <h3 class='img__description'>
                      Rating: {movie.vote_average}
                    </h3>
                  )}
                  <h3>{movie.original_title}</h3>
                </div>
              ))}
            </div>
          ) : (
            <h2 style={{ height: '100px' }}>No Results Found</h2>
          )}
        </div>
        <div
          id='footer'
          class='footer'
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
    </div>
  );
}

export default SearchBar;
