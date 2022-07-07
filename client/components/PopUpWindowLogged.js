import React, { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, Box, CardMedia, CardContent, CardHeader, CardActions, Typography, IconButton, Tooltip, Container } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import fetchUsers from '../store/users'
import { Link } from "react-router-dom";
import { grey } from "@material-ui/core/colors";
import { useFrontEndStyles } from "../theme";
import {logout} from '../store'
import { useHistory } from 'react-router-dom';

const PopUpWindowCardLogged = (props) => {
  // console.log(props.handleClick)
  const classes = useFrontEndStyles();
  
  const dispatch = useDispatch();

  // const handleClick = (event) => {
  //   event.preventDefault();
  //   dispatch(HERE WE HAVE TO DECIDE WHAT TO DISPATCH AFTER WE CLICK ON the wild button)
  //   console.log(event);
  // };

  const handleClickLogout = () => {
    // props.handleClick()
    dispatch(logout())
    

  };

  return (
    <Card xs={12} md={6} lg={3} elevation={3} className={classes.p} variant="elevation" style={{background: "#808080"}} >
      <CardContent>
      <CardHeader align="center" title={<Typography className={classes.h4}>Welcome!</Typography>} />
      </CardContent>
      <Typography className={classes.h4}>
        Welcome USERNAME!
        Histoy?
        My profile/preferences
      </Typography>
      <CardActions>
        <Button style={{margin: '0 auto', display: "flex", background: '#A16AE8'}} >
          Feeling Wild
        </Button>
        <Button style={{margin: '0 auto', display: "flex", background: '#68BBE3'}} onClick={handleClickLogout}>
          Logout
        </Button>
      </CardActions>
    </Card>
  );
}

export default PopUpWindowCardLogged;




