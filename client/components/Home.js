

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

import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

let  events = [
{
"title" : "Discoteque",
"lat": "40.7589",
"lng":"-73.9851",
},

{
"title" : "Jam Session",
"lat": "40.7690",
"lng":"-73.9952",
},
{
"title" : "Art Craft session",
"lat": "40.7489",
"lng":"-73.9751",
}
]

class MapContainer extends Component {
state = {
showingInfoWindow: false,
activeMarker: {},
selectedPlace: {},
query:'',
filteredPlaces: []
};

markers = []

onMarkerClick = (props, marker, e) => {
this.setState({
  selectedPlace: props,
  activeMarker: marker,
  showingInfoWindow: true
 });
}

onLiClick = (i) =>{
this.setState({
    showingInfoWindow: true,
    activeMarker: this.markers[i],
    selectedPlace: events[i]
})
}

onMapClicked = (props) => {
if (this.state.showingInfoWindow) {
  this.setState({
    showingInfoWindow: false,
    activeMarker: null
  })
}
}

render() {
return (
  <div classTitle = 'map-container' style= 
{{marginleft:'250px'}}>
    <div>
      <div classTitle = 'sideMenu'>
        <div classTitle = 'PlaceList'>
          <ol classTitle='Places'>
            {events.map((event, index)=> 
              <li key = {index} classTitle='Place' onClick={() => {this.onLiClick(index)}}>
                {event.title}
              </li>
            )}
          </ol>
        </div>
      </div>
    </div>
    <Map google={this.props.google} zoom={14}
      initialCenter = {{lat:40.7589, lng:-73.9851}} onClick={this.onMapClicked}>
      {events.map((marker, i) => 
          <Marker
          ref={(e) => {if (e) this.markers[i] = 
 e.marker}}
          onClick={this.onMarkerClick}
          title = {marker.title}
          name={marker.title}
          position = 
{{lat:marker.lat,lng:marker.lng}}
          />
      )}
      <InfoWindow
        onOpen={this.windowHasOpened}
        onClose={this.windowHasClosed}
        marker={this.state.activeMarker}
        visible={this.state.showingInfoWindow}>
        <div>
          <h1>{this.state.selectedPlace.title}</h1>
          {/* <h3>{this.state.selectedPlace.Description}</h3>
          <h3>{this.state.selectedPlace.category}</h3>
          <h3>{this.state.selectedPlace.totalGuests}</h3>
          <h3>{this.state.selectedPlace.time}</h3> */}
        </div>
      </InfoWindow>
    </Map>
  </div>
 );
 }
}

export default GoogleApiWrapper({
apiKey: 'AIzaSyDd5tCW_eNmH7IGrTQvgsSs4v5QS1VTank'
})(MapContainer)
