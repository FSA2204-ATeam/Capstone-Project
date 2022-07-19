import React, { useState, useRef } from "react";
import {
  Button,
  Grid,
  Card,
  ButtonGroup,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  CardMedia,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useFrontEndStyles } from "../theme";
import { logout } from "../store";
import { useHistory } from "react-router-dom";
import UserProfileForm from "./UserProfileForm";
import MyEvents from "./MyEvents";

const Welcome = ({ wildModeHandler }) => {
  // const [activeEvents, setActiveEvents] = useState([]);
  const [closeLogout, setCloseLogout] = useState(true);
  const classes = useFrontEndStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const toggleCloseLogout = () => (
    setCloseLogout(!closeLogout), dispatch(logout()), history.push("/")
  );

  //COMPONENT DISPLAY STATE
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const [displayComponent, setDisplayComponent] = useState("welcome");
  const anchorRef = useRef();

  return (
    <div>
      {displayComponent==="welcome" ?
      (
        <div display="flex">
          <Button>BACK</Button>
        </div>
      ) : (
        <div display="flex">
          <Button onClick={() => setDisplayComponent("welcome")}>BACK</Button>
        </div>
      )}
      {isLoggedIn ? (
        <>
          {(() => {
            switch (displayComponent) {
              case "welcome":
                return (
                  <Card>
                    <CardContent>
                      <CardHeader
                        align="center"
                        title={
                          <Typography className={classes.cHeader}>
                            Let's Adventure!
                          </Typography>
                        }
                      />
                      <Typography className={classes.typography}>
                        <Button
                          onClick={() => setDisplayComponent("profile")}
                        >
                          MY PROFILE
                        </Button>
                        <Button onClick={() => setDisplayComponent("myEvents")}>
                          MY EVENTS
                        </Button>
                        <Button
                          onClick={() => wildModeHandler()}
                        >
                          Feeling Wild
                        </Button>
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <ButtonGroup
                        variant="contained"
                        size="small"
                        color="secondary"
                      >
                        <Button onClick={toggleCloseLogout}>Logout</Button>
                      </ButtonGroup>
                    </CardActions>
                  </Card>
                );
              case "profile":
                return <UserProfileForm />;
              case "myEvents":
                return <MyEvents />;
            }
          })()}
        </>
      ) : null}
    </div>
  );
};

export default Welcome;
