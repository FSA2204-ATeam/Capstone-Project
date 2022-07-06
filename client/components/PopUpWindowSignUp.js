// import React, { useEffect } from "react";
// import { makeStyles } from '@material-ui/core/styles';
// import { Button, Card, Box, CardMedia, CardContent, CardHeader, CardActions, Typography, IconButton, Tooltip, Container } from "@material-ui/core";
// import { useDispatch, useSelector } from "react-redux";
// import fetchUsers from '../store/users'
// import { Link } from "react-router-dom";
// import { grey } from "@material-ui/core/colors";
// import { useFrontEndStyles } from "../theme";

// const PopUpWindowCard = () => {
//   const classes = useFrontEndStyles();

//   return (
//     // <Container maxWidth="lg">
//     <Card xs={12} md={6} lg={3} elevation={3} className={classes.p} variant="elevation" style={{background: "#808080"}} >
//       <CardContent>
//       <CardHeader align="center" title={<Typography className={classes.h4}>Welcome!</Typography>} />
//       </CardContent>
//       <CardActions>
//         <Button href='/login' style={{margin: '0 auto', display: "flex", background: '#94C973'}}>
//           Login
//         </Button>
//         <Button href='/signup' style={{margin: '0 auto', display: "flex", background: '#68BBE3'}}>
//           Sign Up
//         </Button>
//       </CardActions>
//     </Card>
//     // </Container>
//   );
// }

// export default PopUpWindowCard;

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
import { registration } from '../store';
import { useDispatch, useSelector } from "react-redux";

const defaultValues = {
  firstname: "",
  lastname: "",
  username: "",
  password: "",
  email: ""
};

const PopUpWindowCardSignUp = (firstname, lastname, email, username, password) => {
  const [formValues, setFormValues] = useState(defaultValues);
  const error = useSelector((state) => state.auth.error);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(registration(firstname, lastname, email, username, password));
  }, []);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     dispatch(loadFromUser());
  //   }
  // }, [isLoggedIn]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="center" justify="center" direction="column">
      <Grid item>
          <TextField
            id="firstname-input"
            name="firstname"
            label="Firstame"
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
            label="Lastame"
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
        <Grid item>
          <TextField
            id="email-input"
            name="email"
            label="Emailame"
            type="text"
            variant="outlined"
            value={formValues.email}
            onChange={handleChange}
          />
        </Grid>
        <Button href="/home" variant="contained" color="primary" type="submit">
          Sign Up
        </Button>
        {error && error.response && <div> {error.response.data} </div>}
        {/* <div class='success-message'>Success! Thank you for registering</div> */}
      </Grid>
    </form>
  );
};
export default PopUpWindowCardSignUp;