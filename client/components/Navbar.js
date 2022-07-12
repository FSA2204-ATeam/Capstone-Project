import { logout } from "../store";
import { connect } from "react-redux";
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { useNavStyles } from "../theme";

const Navbar = () => {
  const classes = useNavStyles();
  return (
    // <div>
      <AppBar position="fixed" >
        <Toolbar>
          <Typography className={classes.title} variant="h4">
              URBAN SAFARI
          </Typography>
        </Toolbar>
      </AppBar>
    // </div>
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
