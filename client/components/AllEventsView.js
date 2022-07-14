import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Marker, InfoWindow } from '@react-google-maps/api';

const AllEventsView = () => {
    const allEvents = useSelector((state) => state.allEvents);

    return (
        <div>
        {allEvents ? (allEvents.map((event, idx) => {
                return (
                  <Marker
                    key={idx}
                    id={idx}
                    position={{
                      lat: parseFloat(event.eventLat),
                      lng: parseFloat(event.eventLng),
                    }}
                    // onClick={() => onMarkerClick(idx, event.lat, event.lng)}
                  >
                  </Marker>
                )
            }))
            : null
        }
        </div>
    )
}

export default AllEventsView;