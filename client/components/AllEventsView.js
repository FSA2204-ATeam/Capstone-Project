import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Marker, InfoWindow } from '@react-google-maps/api';
import { setUserRSVP } from '../store';
import { useDispatch } from 'react-redux';

const AllEventsView = () => {
    const allEvents = useSelector((state) => state.allEvents);
    const [selectedEvent, setSelectedEvent] = useState(null);
    
    const onMarkerClick = (idx) => {
        setSelectedEvent(idx);
    };

    const dispatch = useDispatch();

    const onRSVPClick = (event) => {
        dispatch(setUserRSVP(event));
      };
      
    // var date_test = new Date("2011-07-14 11:23:00".replace(/-/g,"/"));
    // console.log(date_test);

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
                                {new Date(event.startDate).toLocaleDateString('en-us', { weekday:"short", month:"short", day:"numeric", hour:"numeric", minute:"numeric"})} from {new Date(event.endDate).toLocaleDateString('en-us', { weekday:"short", month:"short", day:"numeric", hour:"numeric", minute:"numeric"})}
                              </div>
                              <button onClick={() => onRSVPClick(event)}>
                                RSVP
                              </button>
                            </div>
                          </InfoWindow>
                        ) : null}
                  </Marker>
                )
            }))
            : (null)
        }
        </div>
    )
}

export default AllEventsView;