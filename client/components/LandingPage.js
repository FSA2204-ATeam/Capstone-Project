import React, { useEffect, useState } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import AllEventsView from './AllEventsView';
import { NewEventForm } from './NewEventForm';
import { useSelector } from 'react-redux';
import {
  Button,
  Popover,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
} from '@material-ui/core';
import PopUpWindowLogged from './PopUpWindowLogged';
import PopUpWindowLogin from './PopUpWindowLogin';
import InfoModal from './InfoModal';

const LandingPage = () => {
  const [wildMode, setWildMode] = useState(true);
  const [newEvtPosition, setNewEvtPosition] = useState({});
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const [anchor, setAnchor] = useState(null);

  const openPopover = (event) => {
    setAnchor(event.target);
  };

  //MODAL HANDLER
  const [showInfoModal, setShowInfoModal] = useState(false);
  const openInfoModal = () => {
    setShowInfoModal(!showInfoModal);
  };

  return (
    <div>
      {showInfoModal ? <InfoModal setShowInfoModal={setShowInfoModal} /> : null}
      <LoadScript
        mapIds={['61b5009386a6596e']}
        googleMapsApiKey={'AIzaSyCv34MWCyAXk-l8PBmkFIGDsTUt2S2oe78'}
      >
        <GoogleMap
          //   onClick={() => setSelectedEvent(null)}
          onDblClick={(e) =>
            setNewEvtPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() })
          }
          mapContainerStyle={{ height: '100vh', width: '100vw' }}
          zoom={13}
          center={{ lat: 40.7589, lng: -73.9851 }}
          options={{
            mapId: '61b5009386a6596e',
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          <div>
            <button className="infoWindowButton" onClick={openInfoModal}>
              ?
            </button>
            {!wildMode ? null : (
              <div>
                <AllEventsView />
                {newEvtPosition.lat && (
                  <Marker position={newEvtPosition}>
                    {newEvtPosition.lat && (
                      <InfoWindow
                        position={{
                          lat: parseFloat(newEvtPosition.lat),
                          lng: parseFloat(newEvtPosition.lng),
                        }}
                        //   onCloseClick={() => setSelectedEvent(null)}
                      >
                        <div>
                          <NewEventForm position={newEvtPosition} />
                        </div>
                      </InfoWindow>
                    )}
                  </Marker>
                )}
              </div>
            )}
            <div>
              <Button
                style={{
                  backgroundColor: '#FFFFFF',
                  marginTop: '3vh',
                  marginLeft: 46,
                  height: '60px',
                  width: '60px',
                }}
                variant="contained"
                size="large"
                color="#FFFFFF"
                onClick={openPopover}
              >
                {isLoggedIn ? (
                  <Typography color="secondary">USER</Typography>
                ) : (
                  <Typography color="secondary">LOGIN</Typography>
                )}
              </Button>
              <Popover
                open={Boolean(anchor)}
                anchorReference="anchorPosition"
                anchorPosition={{ top: 215, left: 54 }}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                onClose={() => setAnchor(null)}
              >
                {isLoggedIn ? (
                  <div>
                    <PopUpWindowLogged />
                    {/* <PopUpWindowLogged events={events}/> */}
                  </div>
                ) : (
                  <PopUpWindowLogin />
                )}
              </Popover>
            </div>
          </div>
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default LandingPage;
