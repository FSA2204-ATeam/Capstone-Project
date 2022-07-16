
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import PopUpWindowLogin from "./components/PopUpWindowLogin";
import PopUpWindowSignUp from "./components/PopUpWindowSignUp";
import SpeechToText from "./components/SpeechToText";
import Home from "./components/Home";
import { me } from "./store";
import { fetchUserEvents } from "./store/usersEvents";
import { fetchUserPreferences } from "./store";
import UserProfileForm from "./components/UserProfileForm";
import MyEventReview from "./components/MyEventReview";
import MyEvents from "./components/MyEvents";
import { NewEventForm } from "./components/NewEventForm";
import { getEvents } from "./store/events";
import Randomizer from "./components/Randomizer";
import LandingPage from './components/LandingPage';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/landing" component={LandingPage} />
          <Route exact path="/" component={Home} />
          <Route exact path="/profile" component={UserProfileForm} />
          <Route exact path="/speechtotext" component={SpeechToText} />
          <Route exact path="/myeventreview" component={MyEventReview} />
          <Route exact path="/events/myevents" component={MyEvents} />
          <Route exact path="/newEvent" component={NewEventForm} />
          {/* TEMPORARY */}
          <Route exact path="/testing" component={Randomizer} />
          {/* TEMPORARY */}
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
      dispatch(getEvents());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
