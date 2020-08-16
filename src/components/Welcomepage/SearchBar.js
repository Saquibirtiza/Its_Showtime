import React, { useContext, useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { MdSearch } from 'react-icons/md';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';

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
  multilineColor: {
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  input: {
    color: 'white',
  },
}));

function SearchBar({ handleExit }) {
  const searchRef = React.useRef();
  const classes = useStyles();
  const [movie, setMovie] = React.useState([]);
  const location = useLocation();

  const handleTextFieldChange = (e) => {
    const show = e.target.value;
    localStorage.setItem('searchVal', e.target.value);
    if (show != '') {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${show}&page=1&include_adult=false`
      )
        .then((response) => response.json())
        .then((res) => {
          setMovie(res.results);
        });
    }
  };

  const handleSuggestionClick = (e) => {
    console.log(e);
    document.getElementById('filled-basic').value = e;
    localStorage.setItem('searchVal', e);
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: '0',
        right: '0',
        zIndex: '8',
      }}>
      <form className={classes.root} noValidate autoComplete='off'>
        <TextField
          className={classes.multilineColor}
          InputProps={{
            classes: {
              input: classes.input,
            },
          }}
          style={{ width: '80%' }}
          id='filled-basic'
          placeholder='What movie are you looking for?'
          variant='filled'
          fullwidth
          autoFocus
          ref={searchRef}
          onChange={handleTextFieldChange}
        />
        <RouterLink
          to='/result'
          onClick={() => {
            if (handleExit) handleExit();
            console.log(localStorage.getItem('searchVal'));
          }}>
          <a
            style={{
              position: 'absolute',
              cursor: 'pointer',
              fontSize: '35px',
              right: '13%',
              zIndex: '9',
              color: '#FFF',
              textDecoration: 'none',
            }}>
            <MdSearch style={{ marginTop: '8px' }} />
          </a>
        </RouterLink>
      </form>
      {movie.map((movie) => (
        <div
          onClick={() => handleSuggestionClick(movie.title)}
          style={{
            background: 'rgba(0,0,0,0.7)',
            color: 'white',
            width: '80%',
            margin: 'auto',
            padding: '5px',
            border: '1px solid black',
            display: 'flex',
            flexDirection: 'row',
          }}>
          <div
            style={{
              flex: '1',
              marginLeft: '10px',
              textAlign: 'left',
              justifyContent: 'flex-start',
              cursor: 'pointer',
            }}>
            {movie.original_title}
          </div>
          <div
            style={{
              flex: '1',
              textAlign: 'right',
              justifyContent: 'flex-end',
            }}>
            ({movie.release_date})
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchBar;
