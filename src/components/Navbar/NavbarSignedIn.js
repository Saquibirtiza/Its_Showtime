import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-scroll';
import { useForm } from 'react-hook-form';
import { MdSearch } from 'react-icons/md';
import SearchBar from '../Welcomepage/SearchBar';
import { Link as RouterLink } from 'react-router-dom';
import fire from '../../config/fbConfig';
import { Redirect } from 'react-router';
import { useLocation } from 'react-router-dom';
import { MdClose } from 'react-icons/md';

function Navigationbar() {
  const burgerRef = React.useRef();
  const searchBarRef = React.useRef();
  const listRef = React.useRef();
  const [modalState, setModalState] = useState(false);
  const [modalSigninState, setSigninModalState] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [closeOrSearch, setcloseOrSearch] = useState(true);
  const location = useLocation();

  const pauseScrollSnap = () => {
    // document.documentElement.style.scrollSnapType = 'none';
    // setTimeout(function () {
    //   document.documentElement.style.scrollSnapType = 'y mandatory';
    // }, 500);
  };

  const toggleSearchBar = () => {
    setcloseOrSearch(!closeOrSearch);
    if (searchBarRef.current.style.opacity == 1) {
      searchBarRef.current.style.opacity = 0;
    } else {
      searchBarRef.current.style.opacity = 1;
    }
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

  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (!user) {
        console.log('asdasdasdasdasdasd');
        localStorage.setItem('loggedIn', 0);
        setIsSignedIn(false);
      }
    });
  });

  return (
    <div>
      {isSignedIn ? null : <Redirect to='/' />}
      <link
        href='https://fonts.googleapis.com/css2?family=Poppins&display=swap'
        rel='stylesheet'></link>
      <nav>
        <div class='logo'>
          <RouterLink to='/' style={{ color: '#FFF', textDecoration: 'none' }}>
            <h4>Its Showtime</h4>
          </RouterLink>
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
                  padding: '10px',
                }}>
                <MdClose onClick={() => toggleSearchBar()} />
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
                    onClick={() => pauseScrollSnap()}
                    style={{ cursor: 'pointer' }}
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
                <RouterLink to='/dashboard'>
                  <a style={{ cursor: 'pointer' }}>Dashboard</a>
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to='/'
                  onClick={(event) => {
                    fire.auth().signOut();
                    localStorage.setItem('loggedIn', 0);
                  }}>
                  <a style={{ cursor: 'pointer' }}>Signout</a>
                </RouterLink>
              </li>
            </ul>
            <div class='burger' ref={burgerRef} onClick={toggleClass}>
              <div class='line11'></div>
              <div class='line12'></div>
              <div class='line13'></div>
            </div>
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
