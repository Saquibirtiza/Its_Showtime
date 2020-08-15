import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { useForm } from 'react-hook-form';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import fire from '../../config/fbConfig';
import Link2 from '@material-ui/core/Link';

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

function Signup({ handleExit, handleSwitch }) {
  const classes = useStyles();
  const { register, handleSubmit, errors, reset, clearErrors } = useForm();
  const {
    register: registerSignin,
    handleSubmit: handleSubmitSignin,
    errors: errorsSignin,
    reset: resetSignin,
    clearErrors: clearErrorsSignin,
  } = useForm();

  const callbackExit = () => {
    handleExit();
  };
  const callbackSwitch = () => {
    handleSwitch();
  };

  const onSubmit = (data, e) => {
    console.log(data);
    fire
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((u) => {
        localStorage.setItem('loggedIn', 1);
        document.body.style.overflow = '';
        callbackExit();
        console.log('success');
      })
      .catch((error) => {
        console.log(error);
      });
    e.target.reset();
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
            Sign up
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit(onSubmit)}>
            {errors.password && (
              <div style={{ padding: '25px' }}>
                <h3>{errors.password.message}</h3>
              </div>
            )}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='fname'
                  name='firstName'
                  variant='outlined'
                  required
                  fullWidth
                  id='firstName'
                  label='First Name'
                  inputRef={register({
                    required: 'Please Fill Up The Required Fields',
                  })}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant='outlined'
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  name='lastName'
                  autoComplete='lname'
                  inputRef={register}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  inputRef={register({
                    required: 'Please Fill Up The Required Fields',
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                  inputRef={register({
                    required: 'Please Fill Up The Required Fields',
                  })}
                />
              </Grid>
            </Grid>
            <div style={{ display: 'flex', justifyContent: 'row' }}>
              <Button
                style={{ flex: '3' }}
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}>
                Sign Up
              </Button>
              <Button
                style={{ flex: '1' }}
                onClick={() => {
                  {
                    clearErrors();
                    reset();
                    callbackExit();
                  }
                }}
                type='button'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}>
                Exit
              </Button>
            </div>
            <Grid>
              <Grid item>
                <Link2
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    clearErrors();
                    reset();
                    callbackSwitch();
                  }}
                  variant='body2'>
                  {'Already have an account? Sign in'}
                </Link2>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default Signup;
