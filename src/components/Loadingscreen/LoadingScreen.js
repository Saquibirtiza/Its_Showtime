import React, { useState, useEffect } from 'react';
// import Welcome from 'react-welcome-page';
import { Redirect } from 'react-router';
import image from './film.svg';
import './LoadingScreen.css';

function LoadingScreen() {
  const [done, setDone] = useState(0);
  useEffect(() => {
    setTimeout(function () {
      setDone(1);
    }, 1500);
  });

  return (
    <div>
      <div class='back'>
        <img
          class='imgAni scale-up-center'
          src={image}
          alt='Image'
          width='200'
          height='200'></img>
        <p class='textAni slide-bottom'>Lets Get Started</p>
        {done == 1 ? <Redirect to='/dashboard'></Redirect> : null}
      </div>
    </div>
  );
}

export default LoadingScreen;
