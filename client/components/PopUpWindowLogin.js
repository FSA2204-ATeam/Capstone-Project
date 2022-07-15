import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { authenticate } from '../store';
import { useDispatch } from 'react-redux';
import { useFrontEndStyles } from '../theme';
import { Grid, Button, Card, CardContent, CardHeader, CardActions } from '@material-ui/core';
import PopUpWindowSignUp from './PopUpWindowSignUp';

const defaultValues = {
  username: '',
  password: '',
};

const PopUpWindowLogin = () => {
  const classes = useFrontEndStyles();
  const [formValues, setFormValues] = useState(defaultValues);
  const [loginButtonOn, setLoginButtonOn] = useState(null);
  const [signupButton, setSignupButton] = useState(null);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(authenticate(formValues, 'login'));
    console.log(event);
  };

  const closeLoginPopover = (event) => {
    setLoginButtonOn(event.target);
  }

  const handleSignup = (event) => {
    setSignupButton(event.target);
  }

  return (
    <Card
      xs={12}
      md={6}
      lg={3}
      elevation={3}
      className={classes.p}
      variant="elevation"
      style={{ background: '#FFFFFF' }}
    >
      <CardContent>
        <CardHeader align="center" />
      </CardContent>
      <CardActions>
        {!signupButton ?
        <form onSubmit={handleSubmit}>
          <Grid container alignItems="center" direction="column">
            <Grid item>
              <TextField
                id="username-input"
                name="username"
                label="Userame"
                type="text"
                variant="outlined"
                value={formValues.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                value={formValues.password}
                onChange={handleChange}
              />
            </Grid>
            <Button
              variant="contained"
              type="submit"
              style={{ display: 'flex', background: '#94C973' }}
              onClick={() => closeLoginPopover(null)}
            >
              Log in
            </Button>
            <Button
              variant="contained"
              type="submit"
              style={{ display: 'flex', background: '#68BBE3' }}
              onClick={handleSignup}
            >
              Sign Up
            </Button>
          </Grid>
        </form>
        : (
          <PopUpWindowSignUp/>
        )}
      </CardActions>
    </Card>
  );
};
export default PopUpWindowLogin;
