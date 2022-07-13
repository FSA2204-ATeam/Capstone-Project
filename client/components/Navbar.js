import { logout } from '../store';
import { connect } from 'react-redux';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import { useNavStyles } from '../theme';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const classes = useNavStyles();
  return (
    <div>
      <AppBar
        style={{
          backgroundColor: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-around',
          margin: '1rem',
        }}
        className={{ padding: '10px', marginLeft: '1rem' }}
        position="fixed"
      >
        <Toolbar>
          <Typography className={classes.title} variant="h4" noWrap>
            URBAN SAFARI
          </Typography>
          <Button
            href="/home"
            style={{
              margin: '15px',
              display: 'flex',
              background: '#FFFFFF',
              fontColor: '#000000',
            }}
          >
            HOME
          </Button>

          <Button
            href="/events/myevents"
            style={{
              margin: '15px',
              display: 'flex',
              background: '#FFFFFF',
              fontColor: '#000000',
            }}
          >
            MY EVENTS
          </Button>

          <Button
            href="/profile"
            style={{
              margin: '15px',
              display: 'flex',
              background: '#FFFFFF',
              fontColor: '#000000',
            }}
          >
            PROFILE
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
