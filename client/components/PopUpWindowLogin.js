import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import { authenticate } from '../store';
import { useDispatch } from "react-redux";

const defaultValues = {
  username: "",
  password: ""
};

const PopUpWindowLogin = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  
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
    dispatch(authenticate(formValues, 'login'))
    console.log(event);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="center" justify="center" direction="column">
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
            type="text"
            variant="outlined"
            value={formValues.password}
            onChange={handleChange}
          />
        </Grid>
        <Button href="/home" variant="contained" color="primary" type="submit">
          Log in
        </Button>
      {/* <div class='success-message'>Success! Thank you for registering</div> */}
      </Grid>
    </form>
  );
};
export default PopUpWindowLogin;