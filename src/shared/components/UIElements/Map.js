import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import RoomIcon from '@material-ui/icons/Room';

const Marker = ({ text }) => <div><RoomIcon/>{text}</div>;
 
export default function SimpleMap({location, title}){
  const [center, setCenter] = useState({
    lat: location.lat,
    lng: location.lng
  })
  const [zoom, setZoom] = useState(11)

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_KEY }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          <Marker
            lat={location.lat}
            lng={location.lng}
            text={title}
          />
        </GoogleMapReact>
      </div>
    );
  }