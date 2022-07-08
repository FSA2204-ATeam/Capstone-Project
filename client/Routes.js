
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import PopUpWindowLogin from "./components/PopUpWindowLogin";
import PopUpWindowSignUp from "./components/PopUpWindowSignUp";

import Home from "./components/Home";
import { me } from "./store";
import { fetchUserEvents } from "./store/usersEvents";
import { fetchUserPreferences } from './store';
import UserProfileForm from './components/UserProfileForm';


/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    // const {isLoggedIn} = this.props

    return (
      <div>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={PopUpWindowLogin} />
          <Route exact path="/signup" component={PopUpWindowSignUp} />
          <Route exact path="/profile" component={UserProfileForm} />
        </Switch>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
      dispatch(fetchUserEvents());
      dispatch(fetchUserPreferences());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
