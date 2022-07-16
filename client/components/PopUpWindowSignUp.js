import React, { useState, useEffect } from 'react';
import { registration } from '../store';
import { useDispatch } from 'react-redux';
import { useFrontEndStyles } from '../theme';
import { Grid, TextField, Button } from '@material-ui/core';
import PopUpWindowLogin from './PopUpWindowLogin';

const defaultValues = {
  firstname: '',
  lastname: '',
  username: '',
  password: '',
  email: '',
};

const PopUpWindowSignUp = () => {
  const classes = useFrontEndStyles();
  const [formValues, setFormValues] = useState(defaultValues);
  const [backButton, setBackButton] = useState(null);

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
    dispatch(registration(formValues, 'signup'));
    console.log(event);
  };

  const handleBackButton = (event) => {
    setBackButton(event.target);
  }

  return (
    <div>
      {!backButton ? (
        <form onSubmit={handleSubmit}>
          <Grid
            container
            alignItems="center"
            justify="center"
            direction="column"
          >
            <Grid item>
              <TextField
                id="firstname-input"
                name="firstname"
                label="Firstname"
                type="text"
                variant="outlined"
                value={formValues.firstname}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="lastname-input"
                name="lastname"
                label="Lastname"
                type="text"
                variant="outlined"
                value={formValues.lastname}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="username-input"
                name="username"
                label="Username"
                type="text"
                variant="outlined"
                value={formValues.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="password-input"
                name="password"
                label="Password"
                type="text"
                variant="outlined"
                value={formValues.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="email-input"
                name="email"
                label="Email"
                type="text"
                variant="outlined"
                value={formValues.email}
                onChange={handleChange}
              />
            </Grid>
            <Button
              variant="contained"
              type="submit"
              style={{ background: '#68BBE3' }}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              type="button"
              style={{ display: 'flex', background: '#68BBE3' }}
              onClick={handleBackButton}
            >
              Back
            </Button>
          </Grid>
        </form>
    ) : (
      <PopUpWindowLogin/>
    )}
    </div>
  );
};
export default PopUpWindowSignUp;
