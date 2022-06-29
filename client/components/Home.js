import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const MapContainer = () => {
  const mapStyles = {
    height: '100vh',
    width: '100%',
  };

  const defaultCenter = {
    lat: 40.73061,
    lng: -73.935242,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDd5tCW_eNmH7IGrTQvgsSs4v5QS1VTank">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={15}
        center={defaultCenter}
      />
    </LoadScript>
  );
};

export default MapContainer;

// import React from 'react'
// import {connect} from 'react-redux'

// /**
//  * COMPONENT
//  */
// export const Home = props => {
//   const {username} = props

//   return (
//     <div>
//       <h3>Welcome, {username}</h3>
//     </div>
//   )
// }

// /**
//  * CONTAINER
//  */
// const mapState = state => {
//   return {
//     username: state.auth.username
//   }
// }

// export default connect(mapState)(Home)
