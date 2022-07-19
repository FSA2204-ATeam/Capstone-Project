import React, { useState } from "react";
import { authenticate } from "../store";
import { useDispatch } from "react-redux";
import { Grid, Button, TextField, ButtonGroup } from "@material-ui/core";
import SignUp from "./SignUp";

const defaultValues = {
  username: "",
  password: "",
};

const Login = () => {
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
    dispatch(authenticate(formValues, "login"));
    console.log(event);
  };

  const closeLoginPopover = (event) => {
    setLoginButtonOn(event.target);
  };

  const handleSignup = (event) => {
    setSignupButton(event.target);
  };

  return (
    <div>
      {!signupButton ? (
        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={1}
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <TextField
                id="username-input"
                name="username"
                placeholder="Username"
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
                placeholder="Password"
                type="password"
                variant="outlined"
                value={formValues.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <ButtonGroup variant="contained" size="small" color="secondary">
                <Button type="submit" onClick={() => closeLoginPopover(null)}>
                  Log in
                </Button>
                <Button type="submit" onClick={handleSignup}>
                  Sign Up
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </form>
      ) : (
        <SignUp />
      )}
    </div>
  );
};
export default Login;
