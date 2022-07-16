import React, { useState } from 'react';
import { Button, Card, CardContent, CardHeader, CardActions, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useFrontEndStyles } from '../theme';
import { logout } from '../store';
import { useHistory } from 'react-router-dom';
import theme from '../theme';

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
    <Card
      // xs={12}
      // md={6}
      // lg={3}
      // elevation={3}
      // className={theme}
      // variant="elevation"
      // style={{ background: '#FFFFFF' }}
    >
      <CardContent>
        <CardHeader
          align="center"
          title={<Typography className={classes.cHeader}>Welcome!</Typography>}
        />
      </CardContent>
      <Typography >
        Welcome USERNAME! Histoy? My profile/preferences
      </Typography>
      <CardActions>
        <Button
          style={{ margin: '0 auto', display: 'flex', background: '#A16AE8' }}
          //onClick={uniqueRandomizer(activeEvents.length)} // return random =  [ 3, 1, 0, 2]

          // single event will be set to events[random[idx = 0]]
          // if "next" is selected, then increment idx+1  if idx+1 === NULL display "no more events"
        >
          Feeling Wild
        </Button>
        <Button
          style={{ margin: '0 auto', display: 'flex', background: '#68BBE3' }}
          onClick={toggleCloseLogout}
        >
          Logout
        </Button>
      </CardActions>
    </Card>
  );
};

export default PopUpWindowCardLogged;
