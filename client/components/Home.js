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

const MapContainer = () => {
  /////////////////////////////
  /////     VARIABLES     /////
  /////////////////////////////
  const [mapCenter, setMapCenter] = useState({ lat: 40.7589, lng: -73.9851 });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showUserComponent, setShowUserComponent] = useState(false);
  const [events, setEvents] = useState([
    // {
    //   title: 'Discoteque',
    //   lat: 40.7589,
    //   lng: -73.9851,
    // },
    // {
    //   title: 'Jam Session',
    //   lat: 40.769,
    //   lng: -73.9952,
    // },
    // {
    //   title: 'Art Craft session',
    //   lat: 40.7489,
    //   lng: -73.9751,
    // },
  ]);

  //////////////////////////////////
  /////     EVENT HANDLERS     /////
  //////////////////////////////////
  const onMarkerClick = (idx, lat, lng) => {
    console.log(lat);
    const floatLat = parseFloat(lat);
    const floatLng = parseFloat(lng);
    setSelectedEvent(idx);
    //setMapCenter({ lat: floatLat, lng: floatLng });
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

  return (
    <LoadScript
      mapIds={['61b5009386a6596e']}
      googleMapsApiKey="AIzaSyCv34MWCyAXk-l8PBmkFIGDsTUt2S2oe78"
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

        <button className="userButton" onClick={console.log('test case')}>
          USER
        </button>
      </GoogleMap>
    </LoadScript>
  );
};
export default MapContainer;

// import React, { useState } from 'react';
// import { GoogleMap, LoadScript, InfoBox } from '@react-google-maps/api';
// import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
// import { useDispatch, useSelector } from 'react-redux';

// let events = [
//   {
//     title: 'Discoteque',
//     lat: '40.7589',
//     lng: '-73.9851',
//   },

//   {
//     title: 'Jam Session',
//     lat: '40.7690',
//     lng: '-73.9952',
//   },
//   {
//     title: 'Art Craft session',
//     lat: '40.7489',
//     lng: '-73.9751',
//   },
// ];

// const MapContainer = (props) => {
//   // state = {
//   //   showingInfoWindow: false,
//   //   activeMarker: {},
//   //   selectedPlace: {},
//   //   query:'',
//   //   filteredPlaces: []
//   //   };
//   // const events = useSelector((state) => state.allEvents);
//   const [selectedEvents, setSelectedEvents] = useState({});
//   // const [filter, setFilter] = useState("all");
//   const [showingInfoWindow, setShowingInfoWindow] = useState(false);
//   const [activeMarker, setActiveMarker] = useState({});

//   // const    history = useHistory();

//   // const dispatch = useDispatch();

//   // useEffect(() => {
//   //   // dispatch(fetchEvents());
//   //   dispatch()
//   // }, []);

//   const markers = [];

//   const onMarkerClick = (props, marker, event) => {
//     setSelectedEvents(events[i]);
//     setShowingInfoWindow(true);
//     setActiveMarker(marker);
//   };

//   const onLiClick = (i) => {
//     setShowingInfoWindow(true);
//     setActiveMarker(markers[i]);
//     setSelectedEvents(events[i]);
//   };

//   const onMapClicked = (props) => {
//     if (showingInfoWindow) {
//       setActiveMarker(null);
//       setShowingInfoWindow(false);
//     }
//   };
//   console.log(props);

//   const mapStyles = {
//     height: '100vh',
//     width: '100%',
//   };

//   const defaultCenter = {
//     lat: 40.7589,
//     lng: -73.9851,
//   };

//   return (
//     <GoogleMap
//       google={props.google}
//       mapContainerStyle={mapStyles}
//       zoom={8}
//       center={defaultCenter}
//       options={{ mapId: '61b5009386a6596e' }}
//       onClick={onMapClicked}
//     >
//       <div classTitle="map-container" style={{ marginleft: '250px' }}>
//         <div>
//           <div classTitle="sideMenu">
//             <div classTitle="EventList">
//               <ol classTitle="Events">
//                 {events.map((event, index) => (
//                   <li
//                     key={index}
//                     classTitle="Event"
//                     onClick={() => {
//                       onLiClick(index);
//                     }}
//                   >
//                     {event.title}
//                   </li>
//                 ))}
//               </ol>
//             </div>
//           </div>
//         </div>
//         {/* <Map
//           google={props.google}
//           // const mapId = ['61b5009386a6596e'];
//           mapIds={['61b5009386a6596e']}
//           zoom={14}
//           initialCenter={{ lat: 40.7589, lng: -73.9851 }}
//           onClick={onMapClicked}
//         > */}
//         {events.map((marker, i) => (
//           <Marker
//             ref={(e) => {
//               if (e) markers[i] = e.marker;
//             }}
//             onClick={onMarkerClick}
//             title={marker.title}
//             name={marker.title}
//             position={{ lat: marker.lat, lng: marker.lng }}
//           />
//         ))}
//         <InfoWindow
//           onOpen={props.windowHasOpened}
//           onClose={props.windowHasClosed}
//           marker={activeMarker}
//           visible={showingInfoWindow}
//         >
//           <div>
//             <h1>{selectedEvents.title}</h1>
//             {/* <h3>{state.selectedEvents.Description}</h3>
//               <h3>{state.selectedEvents.category}</h3>
//               <h3>{state.selectedEvents.totalGuests}</h3>
//               <h3>{state.selectedEvents.time}</h3> */}
//           </div>
//         </InfoWindow>
//         {/* </Map> */}
//       </div>
//     </GoogleMap>
//   );
//   //Get client location - (need to incorporate ask permission)
//   // navigator.geolocation.getCurrentPosition((position) => {
//   //   console.log(position.coords.latitude, position.coords.longitude);
//   // });

//   // const mapStyles = {
//   //   height: '100vh',
//   //   width: '100%',
//   // };
//   // const defaultCenter = {
//   //   lat: 47.49855629475769,
//   //   lng: -122.14184416996333,
//   // };

//   // const mapId = ['61b5009386a6596e'];
//   // return (
//   //   <LoadScript
//   //     mapIds={mapId}
//   //     googleMapsApiKey="AIzaSyCv34MWCyAXk-l8PBmkFIGDsTUt2S2oe78"
//   //   >
//   //     <GoogleMap
//   //       mapContainerStyle={mapStyles}
//   //       zoom={8}
//   //       center={defaultCenter}
//   //       options={{ mapId: '61b5009386a6596e' }}
//   //     />
//   //     {events.map((store, index) => {
//   //       return (
//   //         <Marker
//   //           key={index}
//   //           id={index}
//   //           position={{
//   //             lat: 47.49855629475769,
//   //             lng: -122.14184416996333,
//   //           }}
//   //           onClick={() => console.log('You clicked me!')}
//   //         />
//   //       );
//   //     })}
//   //   </LoadScript>
//   // );
// };
// // export default MapContainer;
// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyDd5tCW_eNmH7IGrTQvgsSs4v5QS1VTank',
// })(MapContainer);

// // white_check_mark
// // eyes
// // raised_hands

// // import React from 'react'
// // import {connect} from 'react-redux'

// // /**
// //  * COMPONENT
// //  */
// // export const Home = props => {
// //   const {username} = props

// //   return (
// //     <div>
// //       <h3>Welcome, {username}</h3>
// //     </div>
// //   )
// // }

// // /**
// //  * CONTAINER
// //  */
// // const mapState = state => {
// //   return {
// //     username: state.auth.username
// //   }
// // }

// // export default connect(mapState)(Home)

// // import React, { Component } from 'react';
// // import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

// // let  events = [
// // {
// // "title" : "Discoteque",
// // "lat": "40.7589",
// // "lng":"-73.9851",
// // },

// // {
// // "title" : "Jam Session",
// // "lat": "40.7690",
// // "lng":"-73.9952",
// // },
// // {
// // "title" : "Art Craft session",
// // "lat": "40.7489",
// // "lng":"-73.9751",
// // }
// // ]

// // class MapContainer extends Component {
// // state = {
// // showingInfoWindow: false,
// // activeMarker: {},
// // selectedPlace: {},
// // query:'',
// // filteredPlaces: []
// // };

// // markers = []

// // onMarkerClick = (props, marker, e) => {
// // this.setState({
// //   selectedPlace: props,
// //   activeMarker: marker,
// //   showingInfoWindow: true
// //  });
// // }

// // onLiClick = (i) =>{
// // this.setState({
// //     showingInfoWindow: true,
// //     activeMarker: this.markers[i],
// //     selectedPlace: events[i]
// // })
// // }

// // onMapClicked = (props) => {
// // if (this.state.showingInfoWindow) {
// //   this.setState({
// //     showingInfoWindow: false,
// //     activeMarker: null
// //   })
// // }
// // }

// // render() {
// // return (
// //   <div classTitle = 'map-container' style=
// // {{marginleft:'250px'}}>
// //     <div>
// //       <div classTitle = 'sideMenu'>
// //         <div classTitle = 'PlaceList'>
// //           <ol classTitle='Places'>
// //             {events.map((event, index)=>
// //               <li key = {index} classTitle='Place' onClick={() => {this.onLiClick(index)}}>
// //                 {event.title}
// //               </li>
// //             )}
// //           </ol>
// //         </div>
// //       </div>
// //     </div>
// //     <Map google={this.props.google} zoom={14}
// //       initialCenter = {{lat:40.7589, lng:-73.9851}} onClick={this.onMapClicked}>
// //       {events.map((marker, i) =>
// //           <Marker
// //           ref={(e) => {if (e) this.markers[i] =
// //  e.marker}}
// //           onClick={this.onMarkerClick}
// //           title = {marker.title}
// //           name={marker.title}
// //           position =
// // {{lat:marker.lat,lng:marker.lng}}
// //           />
// //       )}
// //       <InfoWindow
// //         onOpen={this.windowHasOpened}
// //         onClose={this.windowHasClosed}
// //         marker={this.state.activeMarker}
// //         visible={this.state.showingInfoWindow}>
// //         <div>
// //           <h1>{this.state.selectedPlace.title}</h1>
// //           {/* <h3>{this.state.selectedPlace.Description}</h3>
// //           <h3>{this.state.selectedPlace.category}</h3>
// //           <h3>{this.state.selectedPlace.totalGuests}</h3>
// //           <h3>{this.state.selectedPlace.time}</h3> */}
// //         </div>
// //       </InfoWindow>
// //     </Map>
// //   </div>
// //  );
// //  }
// // }

// // export default GoogleApiWrapper({
// // apiKey: 'AIzaSyDd5tCW_eNmH7IGrTQvgsSs4v5QS1VTank'
// // })(MapContainer)
