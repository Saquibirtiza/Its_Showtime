import React, { useState } from 'react';
import './Navbar.css';
import { useForm } from 'react-hook-form';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link2 from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import fire from '../../config/fbConfig';

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
}));

function Signin({ handleExit, handleSwitch }) {
  const classes = useStyles();
  const errorMsg = React.useRef();
  const { register, handleSubmit, errors, reset, clearErrors } = useForm();
  const {
    register: registerSignin,
    handleSubmit: handleSubmitSignin,
    errors: errorsSignin,
    reset: resetSignin,
    clearErrors: clearErrorsSignin,
  } = useForm();

  const onSubmit = (data, e) => {
    console.log(data);
    fire
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((u) => {
        handleExit();
        localStorage.setItem('loggedIn', 1);
        document.body.style.overflow = '';

        console.log('Signin success');
      })
      .catch((error) => {
        errorMsg.current.style.opacity = 1;
        errorMsg.current.style.position = 'static';
        setTimeout(function () {
          errorMsg.current.style.opacity = 0;
          errorMsg.current.style.position = 'absolute';
        }, 2000);
        console.log(error);
      });
    e.target.reset();
  };

  const callbackExit = () => {
    handleExit();
  };
  const callbackSwitch = () => {
    handleSwitch();
  };

  return (
    <div>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <h3
            ref={errorMsg}
            style={{ opacity: 0, padding: '10px', position: 'absolute' }}>
            Incorrect Email and Password
          </h3>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmitSignin(onSubmit)}>
            {errorsSignin.password && (
              <div style={{ padding: '25px', color: 'black' }}>
                <h3>{errorsSignin.password.message}</h3>
              </div>
            )}
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              inputRef={registerSignin({
                required: 'Please Fill Up The Required Fields',
              })}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              inputRef={registerSignin({
                required: 'Please Fill Up The Required Fields',
                minLength: { value: 6, message: 'Password is too short' },
              })}
            />
            <div style={{ display: 'flex', justifyContent: 'row' }}>
              <Button
                style={{ flex: '3' }}
                type='submit'
                variant='contained'
                color='primary'
                className={classes.submit}>
                Sign In
              </Button>
              <Button
                style={{ flex: '1' }}
                type='button'
                onClick={() => {
                  callbackExit();
                  clearErrorsSignin();
                  resetSignin();
                }}
                variant='contained'
                color='primary'
                className={classes.submit}>
                Exit
              </Button>
            </div>

            <Grid>
              <Grid item>
                <Link2
                  onClick={() => {
                    clearErrorsSignin();
                    resetSignin();
                    callbackSwitch();
                  }}
                  variant='body2'
                  style={{ padding: '2px', cursor: 'pointer' }}>
                  {"Don't have an account? Sign Up"}
                </Link2>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default Signin;
