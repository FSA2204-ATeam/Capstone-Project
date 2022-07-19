import React, { useState } from "react";
import { registration } from "../store";
import { useDispatch } from "react-redux";
import { Grid, TextField, Button, ButtonGroup } from "@material-ui/core";
import Login from "./Login";

const defaultValues = {
  firstname: "",
  lastname: "",
  username: "",
  password: "",
  email: "",
};

const SignUp = () => {
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
    dispatch(registration(formValues, "signup"));
    console.log(event);
  };

  const handleBackButton = (event) => {
    setBackButton(event.target);
  };

  return (
    <div>
      {!backButton ? (
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
                id="firstname-input"
                name="firstname"
                placeholder="First Name"
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
                placeholder="Last Name"
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
                placeholder="Username"
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
                placeholder="Password"
                type="password"
                variant="outlined"
                value={formValues.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="email-input"
                name="email"
                placeholder="Email"
                type="text"
                variant="outlined"
                value={formValues.email}
                onChange={handleChange}
              />
            </Grid>
            <ButtonGroup variant="contained" size="small" color="secondary">
              <Button type="submit">Submit</Button>
              <Button type="button" onClick={handleBackButton}>
                Back
              </Button>
            </ButtonGroup>
          </Grid>
        </form>
      ) : (
        <Login />
      )}
    </div>
  );
};
export default SignUp;
