import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  Box,
  CardMedia,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  IconButton,
  Tooltip,
  Container,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import fetchUsers from "../store/users";
import { Link } from "react-router-dom";
import { grey } from "@material-ui/core/colors";
import { useFrontEndStyles } from "../theme";
import { logout } from "../store";
import { useHistory } from "react-router-dom";

const PopUpWindowCardLogged = () => {
  // const [firstname, setFirstname] = useState("");
  const firstname = useSelector((state) => state.auth.firstname);
  const classes = useFrontEndStyles();

  const dispatch = useDispatch();
  const history = useHistory();

  const [activeEvents, setActiveEvents] = useState([]);

  const [closeLogout, setCloseLogout] = useState(true);
  const toggleCloseLogout = () => (
    setCloseLogout(!closeLogout), dispatch(logout()), history.push("/")
  );

  // const handleClick = (event) => {
  //   event.preventDefault();
  //   dispatch(HERE WE HAVE TO DECIDE WHAT TO DISPATCH AFTER WE CLICK ON the wild button)
  //   console.log(event);
  // };

  return (
    <Card
      xs={12}
      md={6}
      lg={3}
      elevation={3}
      className={classes.p}
      variant="elevation"
      style={{ background: "#FFFFFF" }}
    >
      <CardContent>
        <CardHeader
          align="center"
          title={<Typography className={classes.h4}>Welcome!</Typography>}
        />
      </CardContent>
      <Typography className={classes.h4}>
        Welcome USERNAME! Histoy? My profile/preferences
      </Typography>
      <CardActions>
        <Button
          style={{ margin: "0 auto", display: "flex", background: "#A16AE8" }}
          //onClick={uniqueRandomizer(activeEvents.length)} // return random =  [ 3, 1, 0, 2]

          // single event will be set to events[random[idx = 0]]
          // if "next" is selected, then increment idx+1  if idx+1 === NULL display "no more events"
        >
          Feeling Wild
        </Button>
        <Button
          href="/"
          style={{ margin: "0 auto", display: "flex", background: "#68BBE3" }}
          onClick={toggleCloseLogout}
        >
          Logout
        </Button>
      </CardActions>
    </Card>
    // </Box>
  );
};

export default PopUpWindowCardLogged;
