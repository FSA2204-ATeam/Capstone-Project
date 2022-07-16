import React, { useState } from 'react';
import { Button, Grid, Card, ButtonGroup, CardContent, CardHeader, CardActions, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useFrontEndStyles } from '../theme';
import { logout } from '../store';
import { useHistory } from 'react-router-dom';

const PopUpWindowCardLogged = () => {
  // const [activeEvents, setActiveEvents] = useState([]);
  const [closeLogout, setCloseLogout] = useState(true);
  const classes = useFrontEndStyles();

  const dispatch = useDispatch();
  const history = useHistory();

  const toggleCloseLogout = () => (
    setCloseLogout(!closeLogout), dispatch(logout()), history.push('/landing')
  );

  // const handleClick = (event) => {
  //   event.preventDefault();
  //   dispatch(HERE WE HAVE TO DECIDE WHAT TO DISPATCH AFTER WE CLICK ON the wild button)
  //   console.log(event);
  // };

  return (
    <div>
    <Card
    >
      <CardContent>
        <CardHeader
          align="center"
          title={<Typography className={classes.cHeader}>Welcome!</Typography>}
        />
        <Typography className={classes.typography}>
        <Button
          href="/profile"
          className={classes.links}
          >
            PROFILE
        </Button>
        <Button
          href="/events/myevents"
          className={classes.links}
          >
            MY EVENTS
        </Button>
        </Typography>
      </CardContent>
      <CardActions>
      <ButtonGroup
              variant="contained"
              size="small"
              color="secondary"
            >
        <Button
          //onClick={uniqueRandomizer(activeEvents.length)} // return random =  [ 3, 1, 0, 2]

          // single event will be set to events[random[idx = 0]]
          // if "next" is selected, then increment idx+1  if idx+1 === NULL display "no more events"
        >
          Feeling Wild
        </Button>
        <Button
          onClick={toggleCloseLogout}
        >
          Logout
        </Button>
        </ButtonGroup>
      </CardActions>
    </Card>
    </div>
  );
};

export default PopUpWindowCardLogged;
