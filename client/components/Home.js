// import React, { useEffect, useState } from 'react';
// import {
//   GoogleMap,
//   LoadScript,
//   Marker,
//   InfoWindow,
// } from '@react-google-maps/api';
// import { Room, Star, StarBorder } from '@material-ui/icons';
// import Login from './LoginForm';
// import Signup from './SignUpForm';
// import axios from 'axios';

// const MapContainer = () => {
//   /////////////////////////////
//   /////     VARIABLES     /////
//   /////////////////////////////
//   const [mapCenter, setMapCenter] = useState({ lat: 40.7589, lng: -73.9851 });
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [showUserComponent, setShowUserComponent] = useState(false);
//   const [events, setEvents] = useState([
//   ]);

//   //////////////////////////////////
//   /////     EVENT HANDLERS     /////
//   //////////////////////////////////
//   const onMarkerClick = (idx, lat, lng) => {
//     console.log(lat);
//     const floatLat = parseFloat(lat);
//     const floatLng = parseFloat(lng);
//     setSelectedEvent(idx);
//   };

//   //Get client location - (need to incorporate ask permission)
//   navigator.geolocation.getCurrentPosition((position) => {
//     console.log(position.coords.latitude, position.coords.longitude);
//   });

//   const mapStyles = {
//     height: '100vh',
//     width: '100%',
//   };

//   useEffect(() => {
//     const getEvents = async () => {
//       try {
//         const events = await axios.get('/api/events');
//         console.log(events.data);
//         setEvents(events.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getEvents();
//   }, []);

//   // const GOOGLE_MAPS_API_KEY = `${process.env.GOOGLE_MAPS_API_KEY}`;
//   // console.log(process.env.GOOGLE_MAPS_API_KEY,'---------')
//   // AIzaSyCv34MWCyAXk-l8PBmkFIGDsTUt2S2oe78

//   return (
//     <LoadScript
//       mapIds={['61b5009386a6596e']}
//       googleMapsApiKey={"AIzaSyCv34MWCyAXk-l8PBmkFIGDsTUt2S2oe78"}
//     >
//       <GoogleMap
//         onClick={() => setSelectedEvent(null)}
//         mapContainerStyle={mapStyles}
//         zoom={13}
//         center={mapCenter}
//         options={{
//           mapId: '61b5009386a6596e',
//           zoomControl: false,
//           streetViewControl: false,
//           mapTypeControl: false,
//           fullscreenControl: false,
//         }}
//       >
//         {events
//           ? events.map((event, idx) => {
//               console.log('events.map is running');
//               return (
//                 <Marker
//                   key={idx}
//                   id={idx}
//                   position={{
//                     lat: parseFloat(event.geometry[0].lat),
//                     lng: parseFloat(event.geometry[0].lng),
//                   }}
//                   onClick={() => onMarkerClick(idx, event.lat, event.lng)}
//                 >
//                   {selectedEvent === idx ? (
//                     <InfoWindow
//                       position={{
//                         lat: parseFloat(event.geometry[0].lat),
//                         lng: parseFloat(event.geometry[0].lng),
//                       }}
//                       onCloseClick={() => setSelectedEvent(null)}
//                     >
//                       <div>{event.shortDesc}</div>
//                     </InfoWindow>
//                   ) : null}
//                 </Marker>
//               );
//             })
//           : null}

//         <button className="userButton" onClick={console.log('test case')}>
//           USER
//         </button>
//       </GoogleMap>
//     </LoadScript>
//   );
// };
// export default MapContainer;

import React, { useEffect, useState } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { Room, Star, StarBorder } from '@material-ui/icons';
import Login from './LoginForm';
import Signup from './SignUpForm';
import axios from 'axios';
import User from './PopUpWindowCard';
import { connect, useSelector } from "react-redux";
import { logout } from '../store';
import PopUpWindowCard from './PopUpWindowCard'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import LoginForm from './LoginForm'

const MapContainer = ({isLoggedIn, handleClick}) => {
  /////////////////////////////
  /////     VARIABLES     /////
  /////////////////////////////
  const [mapCenter, setMapCenter] = useState({ lat: 40.7589, lng: -73.9851 });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showUserComponent, setShowUserComponent] = useState(false);
  const [events, setEvents] = useState([
  ]);

  //////////////////////////////////
  /////     EVENT HANDLERS     /////
  //////////////////////////////////
  const onMarkerClick = (idx, lat, lng) => {
    console.log(lat);
    const floatLat = parseFloat(lat);
    const floatLng = parseFloat(lng);
    setSelectedEvent(idx);
  };

  //Get client location - (need to incorporate ask permission)
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position.coords.latitude, position.coords.longitude);
  });

  const mapStyles = {
    height: '100vh',
    width: '100%',
  };

  useEffect(() => {
    const getEvents = async () => {
      try {
        const events = await axios.get('/api/events');
        console.log(events.data);
        setEvents(events.data);
      } catch (err) {
        console.log(err);
      }
    };
    getEvents();
  }, []);
  

  // const GOOGLE_MAPS_API_KEY = `${process.env.GOOGLE_MAPS_API_KEY}`;
  // console.log(process.env.GOOGLE_MAPS_API_KEY,'---------')
  // AIzaSyCv34MWCyAXk-l8PBmkFIGDsTUt2S2oe78

  return (
    <LoadScript
      mapIds={['61b5009386a6596e']}
      googleMapsApiKey={"AIzaSyCv34MWCyAXk-l8PBmkFIGDsTUt2S2oe78"}
    >
      <GoogleMap
        onClick={() => setSelectedEvent(null)}
        mapContainerStyle={mapStyles}
        zoom={13}
        center={mapCenter}
        options={{
          mapId: '61b5009386a6596e',
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {events
          ? events.map((event, idx) => {
              console.log('events.map is running');
              return (
                <Marker
                  key={idx}
                  id={idx}
                  position={{
                    lat: parseFloat(event.geometry[0].lat),
                    lng: parseFloat(event.geometry[0].lng),
                  }}
                  onClick={() => onMarkerClick(idx, event.lat, event.lng)}
                >
                  {selectedEvent === idx ? (
                    <InfoWindow
                      position={{
                        lat: parseFloat(event.geometry[0].lat),
                        lng: parseFloat(event.geometry[0].lng),
                      }}
                      onCloseClick={() => setSelectedEvent(null)}
                    >
                      <div>{event.shortDesc}</div>
                    </InfoWindow>
                  ) : null}
                </Marker>
              );
            })
          : null}
          {isLoggedIn ? (
              <div>
                <PopUpWindowCard login={LoginForm}/>
                {/* <Link>
                  <Button >
                    USER
                  </Button>
                </Link>
                <Link>
                  <Button href="#" onClick={handleClick}>
                    Logout
                  </Button>
                </Link> */}
                </div>
            ) : (
<h1></h1>
            )}
      </GoogleMap>
    </LoadScript>
  );
};

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

export default connect(mapState, mapDispatch)(MapContainer);
