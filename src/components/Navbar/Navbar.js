import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-scroll';
import { useForm } from 'react-hook-form';
import { MdSearch } from 'react-icons/md';
import { MdClose } from 'react-icons/md';
import SearchBar from '../Welcomepage/SearchBar';
import Signin from './Signin';
import Signup from './Signup';
import { Link as RouterLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

// import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';

// import Link2 from '@material-ui/core/Link';
// import Grid from '@material-ui/core/Grid';

// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
// import Container from '@material-ui/core/Container';

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: '100%', // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

function Navigationbar() {
  // const classes = useStyles();
  const burgerRef = React.useRef();
  const searchBarRef = React.useRef();
  const listRef = React.useRef();
  const [modalState, setModalState] = useState(false);
  const [modalSigninState, setSigninModalState] = useState(false);
  const [closeOrSearch, setcloseOrSearch] = useState(true);
  let location = useLocation();

  // const { register, handleSubmit, errors, reset, clearErrors } = useForm();
  // const {
  //   register: registerSignin,
  //   handleSubmit: handleSubmitSignin,
  //   errors: errorsSignin,
  //   reset: resetSignin,
  //   clearErrors: clearErrorsSignin,
  // } = useForm();

  const toggleModalState = () => {
    if (window.innerWidth > 768) {
      if (document.body.style.overflow) {
        document.body.style.overflow = '';
      } else {
        document.body.style.overflow = 'hidden';
      }
    }

    setModalState(!modalState);
  };

  const toggleSearchBar = () => {
    setcloseOrSearch(!closeOrSearch);
    if (searchBarRef.current.style.opacity == 1) {
      searchBarRef.current.style.opacity = 0;
    } else {
      searchBarRef.current.style.opacity = 1;
    }
  };

  const toggleSigninModalState = () => {
    if (window.innerWidth > 768) {
      if (document.body.style.overflow) {
        document.body.style.overflow = '';
      } else {
        document.body.style.overflow = 'hidden';
      }
    }
    setSigninModalState(!modalSigninState);
  };

  const toggleClass = () => {
    listRef.current.classList.toggle('nav-active');
    if (document.body.style.overflow) {
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = 'hidden';
    }

    listRef.current.childNodes.forEach((element, index) => {
      if (element.style.animation) {
        element.style.animation = '';
      } else {
        element.style.animation = `navLinkFade 0.5s ease forwards
        ${index / 7 + 0.5}s`;
      }
    });
    burgerRef.current.classList.toggle('toggle');
  };

  return (
    <div>
      <link
        href='https://fonts.googleapis.com/css2?family=Poppins&display=swap'
        rel='stylesheet'></link>
      <nav>
        <div class='logo'>
          <RouterLink to='/' style={{ color: '#FFF', textDecoration: 'none' }}>
            <h4>Its Showtime</h4>
          </RouterLink>
        </div>

        <div className={`modalBackground modalShowing-${modalState}`}>
          <div className={'modalInner'}>
            <Signup
              handleExit={() => toggleModalState()}
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
              handleExit={() => toggleSigninModalState()}
              handleSwitch={() => {
                toggleModalState();
                toggleSigninModalState();
              }}
            />
          </div>
        </div>

        {/* ------------------------------------------------------------------------------------------------------- */}
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div>
            {closeOrSearch ? (
              <a
                style={{
                  cursor: 'pointer',
                  fontSize: '22px',
                  color: '#FFF',
                  padding: '20px',
                }}>
                <MdSearch class='iconstyle' onClick={() => toggleSearchBar()} />
              </a>
            ) : (
              <a
                style={{
                  cursor: 'pointer',
                  fontSize: '20px',
                  color: '#FFF',
                  padding: '20px',
                }}>
                <MdClose class='iconstyle' onClick={() => toggleSearchBar()} />
              </a>
            )}
          </div>
          <div>
            <ul class={'nav-links'} ref={listRef}>
              <li>
                {location.pathname != '/' ? (
                  <RouterLink
                    to='/'
                    style={{ color: '#FFF', textDecoration: 'none' }}>
                    Movies
                  </RouterLink>
                ) : (
                  <Link
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      if (window.innerWidth <= 768) {
                        toggleClass();
                      }
                    }}
                    activeClass='active'
                    to='trending'
                    spy={true}
                    smooth={true}
                    duration={500}>
                    Movies
                  </Link>
                )}
              </li>
              <li>
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={() => toggleSigninModalState()}>
                  Signin
                </a>
              </li>
              <li>
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={() => toggleModalState()}>
                  Get Started
                </a>
              </li>
            </ul>
          </div>
          <div class='burger' ref={burgerRef} onClick={toggleClass}>
            <div class='line11'></div>
            <div class='line12'></div>
            <div class='line13'></div>
          </div>
        </div>
      </nav>
      <div ref={searchBarRef} style={{ opacity: '0', zIndex: '9' }}>
        <SearchBar
          ref={searchBarRef}
          handleExit={() => toggleSearchBar()}
          onClick={() => toggleSearchBar()}
        />
      </div>
    </div>
  );
}

export default Navigationbar;
