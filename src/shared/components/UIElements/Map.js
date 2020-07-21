import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import './marker.css'
 
export default function SimpleMap({location, title}){
  const [center, setCenter] = useState({
    lat: location.lat,
    lng: location.lng
  })
  const [zoom, setZoom] = useState(11)

    return (
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

  const Marker = props => {
    return <>
      <div>{props.text}</div>
      <div className="pin"></div>
      <div className="pulse"></div>
    </>
  }