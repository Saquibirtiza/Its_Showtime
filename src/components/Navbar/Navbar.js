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
import { Redirect } from 'react-router';

function Navigationbar() {
  const burgerRef = React.useRef();
  const searchBarRef = React.useRef();
  const listRef = React.useRef();
  const [modalState, setModalState] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(0);
  const [modalSigninState, setSigninModalState] = useState(false);
  const [closeOrSearch, setcloseOrSearch] = useState(true);
  let location = useLocation();

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
      {isSignedUp == 1 ? <Redirect to='/loading' /> : null}
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
              <div
                style={{
                  cursor: 'pointer',
                  fontSize: '22px',
                  color: '#FFF',
                }}>
                <MdSearch class='iconstyle' onClick={() => toggleSearchBar()} />
              </div>
            ) : (
              <div
                style={{
                  cursor: 'pointer',
                  fontSize: '20px',
                  color: '#FFF',
                }}>
                <MdClose class='iconstyle' onClick={() => toggleSearchBar()} />
              </div>
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
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={() => toggleSigninModalState()}>
                  Signin
                </div>
              </li>
              <li>
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={() => toggleModalState()}>
                  Get Started
                </div>
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
