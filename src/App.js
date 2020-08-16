import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import NavbarSignedIn from './components/Navbar/NavbarSignedIn';
import Welcomepage from './components/Welcomepage/Welcomepage';
import { MovieProvider } from './components/Movielist/MovieListContext';
import Result from './components/SearchResult/SearchResult';
import DashBoard from './components/DashBoard/DashBoard';
import LoadingScreen from './components/Loadingscreen/LoadingScreen';
import fire from './config/fbConfig';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [user, setUser] = useState(null);

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        localStorage.setItem('loggedIn', 1);
      } else {
        setUser(null);
        localStorage.setItem('loggedIn', 0);
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  return (
    <div className='App'>
      <Router>
        <body>
          <div className='App'>
            <div>
              <Switch>
                <Route
                  path='/'
                  exact
                  render={(props) => {
                    return (
                      <MovieProvider>
                        <section>
                          {localStorage.getItem('loggedIn') == 1 ? (
                            <NavbarSignedIn />
                          ) : (
                            <Navbar />
                          )}
                        </section>
                        <Welcomepage />
                      </MovieProvider>
                    );
                  }}
                />
                <Route
                  path='/result'
                  render={(props) => {
                    return (
                      <MovieProvider>
                        {localStorage.getItem('loggedIn') == 1 ? (
                          <NavbarSignedIn />
                        ) : (
                          <Navbar />
                        )}
                        <Result />
                      </MovieProvider>
                    );
                  }}
                />
                <Route
                  path='/dashboard'
                  render={(props) => {
                    return (
                      <MovieProvider>
                        {localStorage.getItem('loggedIn') ? (
                          // <section>
                          <NavbarSignedIn />
                        ) : (
                          // </section>
                          <Navbar />
                        )}
                        <DashBoard />
                      </MovieProvider>
                    );
                  }}
                />
                <Route
                  path='/loading'
                  render={(props) => {
                    return (
                      <MovieProvider>
                        <LoadingScreen />
                      </MovieProvider>
                    );
                  }}
                />
              </Switch>
            </div>
          </div>
        </body>
      </Router>
    </div>
  );
}

export default App;
