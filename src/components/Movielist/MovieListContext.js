import React, { useState, createContext, useEffect } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';

export const MovieContext = createContext();

export const MovieProvider = (props) => {
  const [movies, setMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
    )
      .then((response) => response.json())
      .then((res) => {
        setMovies(res.results);
      });
  }, []);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_API_KEY}&region=US`
    )
      .then((response) => response.json())
      .then((res) => {
        setUpcomingMovies(res.results);
      });
  }, []);

  return (
    <MovieContext.Provider
      value={[movies, setMovies, upcomingMovies, setUpcomingMovies]}>
      {props.children}
    </MovieContext.Provider>
  );
};
