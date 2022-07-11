import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { Room, Star, StarBorder } from "@material-ui/icons";
import axios from "axios";
import User from "./PopUpWindowLogin";
import { connect, useSelector } from "react-redux";
import { logout } from "../store";
import { setUserRSVP } from "../store/usersEvents";
import PopUpWindowLogin from "./PopUpWindowLogin";
import PopUpWindowSignUp from "./PopUpWindowSignUp";
import PopUpWindowLogged from "./PopUpWindowLogged";
import { Link } from "react-router-dom";
import { Grid, Popover } from "@material-ui/core";
import { useFrontEndStyles } from "../theme";

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

const MapContainer = ({
  isLoggedIn,
  handleClick,
  handleClickLogout, // may not need this
  firstname,
  confirmUserRSVP,
  usersEvents,
}) => {
  const [mapCenter, setMapCenter] = useState({ lat: 40.7589, lng: -73.9851 });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showUserComponent, setShowUserComponent] = useState(false);
  const [events, setEvents] = useState([]);
  const [anchor, setAnchor] = useState(null);
  const classes = useFrontEndStyles();

  //const [event, setUsersEventRSVP] = useState(null);

  const [popoverLogin, setPopoverLogin] = useState(false);
  const toggleLogin = () => setPopoverLogin(!popoverLogin);

  const [popoverSignup, setPopoverSignup] = useState(false);
  const toggleSignup = () => setPopoverSignup(!popoverSignup);

  const onMarkerClick = (idx, lat, lng) => {
    //console.log(lat);
    const floatLat = parseFloat(lat);
    const floatLng = parseFloat(lng);
    setSelectedEvent(idx);
  };

  const openPopover = (event) => {
    setAnchor(event.target);
  };

  const onRSVPClick = (event) => {
    confirmUserRSVP(event);
  };

  //Get client location - (need to incorporate ask permission)
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position.coords.latitude, position.coords.longitude);
  });

  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  useEffect(() => {
    const getEvents = async () => {
      try {
        const events = await axios.get("/api/events");
        console.log("events data --->", events.data);
        setEvents(events.data);
      } catch (err) {
        console.log(err);
      }
    };
    getEvents();
  }, []);

  const [newEvtPosition, setNewEvtPosition] = useState({});
  const handleDblClick = (e) => {
    console.log("DoubleClickEvent!!!!!!!!", e);
    setNewEvtPosition(e);
  };

  return (
    <div>
      <Container maxWidth="lg" sx={{ marginY: 12 }}>
        <Grid container spacing={5} style={{ justifyContent: "space-around" }}>
          <LoadScript
            mapIds={["61b5009386a6596e"]}
            googleMapsApiKey={"AIzaSyCv34MWCyAXk-l8PBmkFIGDsTUt2S2oe78"}
          >
            <GoogleMap
              onClick={() => setSelectedEvent(null)}
              onDblClick={(e) =>
                handleDblClick({ lat: e.latLng.lat(), lng: e.latLng.lng() })
              }
              mapContainerStyle={mapStyles}
              zoom={13}
              center={mapCenter}
              options={{
                mapId: "61b5009386a6596e",
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
            >
              {events
                ? events.map((event, idx) => {
                    return (
                      <Marker
                        key={idx}
                        id={idx}
                        position={{
                          lat: parseFloat(event.eventLat),
                          lng: parseFloat(event.eventLng),
                        }}
                        onClick={() => onMarkerClick(idx, event.lat, event.lng)}
                      >
                        {selectedEvent === idx ? (
                          <InfoWindow
                            position={{
                              lat: parseFloat(event.eventLat),
                              lng: parseFloat(event.eventLng),
                            }}
                            onCloseClick={() => setSelectedEvent(null)}
                          >
                            <div>
                              <div>{event.shortDesc}</div>
                              <div>
                                {event.datePart} from {event.timePart}
                              </div>
                              {console.log("API events", events)}
                              <button onClick={() => onRSVPClick(event)}>
                                RSVP
                              </button>
                            </div>
                          </InfoWindow>
                        ) : null}
                      </Marker>
                    );
                  })
                : null}
              {newEvtPosition && (
                <Marker key={1234} id={1234} position={newEvtPosition}>
                  {/* <InfoWindow
                  position={{
                    lat: 40.7589,
                    lng: -73.9851,
                  }}
                >
                  <div>awesomeness</div>
                </InfoWindow> */}
                </Marker>
              )}
              {isLoggedIn ? (
                <div>
                  <Button
                    style={{
                      marginTop: 10, // was set to 70 in main
                      marginLeft: 860,
                      height: "60px",
                      width: "60px",
                    }}
                    variant="contained"
                    size="large"
                    color="#808080"
                    onClick={openPopover}
                  >
                    USER
                    {/* {firstname} */}
                  </Button>
                  <Popover
                    open={Boolean(anchor)}
                    anchorReference="anchorPosition"
                    anchorPosition={{ top: 150, left: 980 }}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    onClose={() => setAnchor(null)}
                  >
                    <PopUpWindowLogged />
                  </Popover>
                </div>
              ) : (
                <div>
                  <Button
                    style={{
                      marginTop: 10, // was 70 in main
                      marginLeft: 860,
                      height: "60px",
                      width: "60px",
                    }}
                    variant="contained"
                    size="large"
                    color="#808080"
                    onClick={openPopover}
                  >
                    😀
                  </Button>
                  <Popover
                    open={Boolean(anchor)}
                    anchorReference="anchorPosition"
                    anchorPosition={{ top: 150, left: 980 }}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    onClose={() => setAnchor(null)}
                  >
                    <Card
                      xs={12}
                      md={6}
                      lg={3}
                      elevation={3}
                      className={classes.p}
                      variant="elevation"
                      style={{ background: "#808080" }}
                    >
                      <CardContent>
                        <CardHeader
                          align="center"
                          title={
                            <Typography className={classes.h4}>
                              Welcome!
                            </Typography>
                          }
                        />
                      </CardContent>
                      {popoverLogin ? (
                        <Popover
                          open={Boolean(anchor)}
                          anchorReference="anchorPosition"
                          isOpen={popoverLogin}
                          target="Login"
                          anchorPosition={{ top: 150, left: 980 }}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          onClose={() => setAnchor(null)}
                        >
                          <PopUpWindowLogin />
                        </Popover>
                      ) : popoverSignup ? (
                        <Popover
                          open={Boolean(anchor)}
                          anchorReference="anchorPosition"
                          isOpen={popoverSignup}
                          target="Signup"
                          anchorPosition={{ top: 150, left: 980 }}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          onClose={() => setAnchor(null)}
                        >
                          <PopUpWindowSignUp />
                        </Popover>
                      ) : (
                        <CardActions>
                          <Button
                            id="Login"
                            style={{
                              margin: "0 auto",
                              display: "flex",
                              background: "#94C973",
                            }}
                            onClick={toggleLogin}
                          >
                            Login
                          </Button>
                          <Button
                            id="Signup"
                            style={{
                              margin: "0 auto",
                              display: "flex",
                              background: "#68BBE3",
                            }}
                            onClick={toggleSignup}
                          >
                            Sign Up
                          </Button>
                        </CardActions>
                      )}
                    </Card>
                  </Popover>
                </div>
              )}
            </GoogleMap>
          </LoadScript>
        </Grid>
      </Container>
    </div>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.isAdmin,
    usersEvents: state.usersEvents,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
    confirmUserRSVP(event) {
      dispatch(setUserRSVP(event));
    },
  };
};

export default connect(mapState, mapDispatch)(MapContainer);
