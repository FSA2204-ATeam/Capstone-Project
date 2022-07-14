import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import AllEventsView from './AllEventsView';
import { NewEventForm } from './NewEventForm';

const LandingPage = () => {
  const [wildMode, setWildMode] = useState(true);
  const [newEvtPosition, setNewEvtPosition] = useState({});

  return (
    <div>
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
          {!wildMode ? (null) : (
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
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default LandingPage