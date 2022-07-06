import React, { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, Box, CardMedia, CardContent, CardHeader, CardActions, Typography, IconButton, Tooltip, Container } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import fetchUsers from '../store/users'
import { Link } from "react-router-dom";
import { grey } from "@material-ui/core/colors";
import { useFrontEndStyles } from "../theme";

const PopUpWindowCardWelcome = () => {
  const classes = useFrontEndStyles();

  return (
    <Card xs={12} md={6} lg={3} elevation={3} className={classes.p} variant="elevation" style={{background: "#808080"}} >
      <CardContent>
      <CardHeader align="center" title={<Typography className={classes.h4}>Welcome!</Typography>} />
      </CardContent>
      <CardActions>
        <Button href='/login' style={{margin: '0 auto', display: "flex", background: '#94C973'}}>
          Login
        </Button>
        <Button href='/signup' style={{margin: '0 auto', display: "flex", background: '#68BBE3'}}>
          Sign Up
        </Button>
      </CardActions>
    </Card>
  );
}

export default PopUpWindowCardWelcome;