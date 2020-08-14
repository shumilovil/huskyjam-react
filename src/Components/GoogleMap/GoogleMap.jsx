import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Marker } from './Marker';
import './GoogleMap.css'



export const Map = (props) => {   
  
    return (      
      <div className='googleMap'>
        <GoogleMapReact
          bootstrapURLKeys={{ key: '' }}
          defaultCenter={props.center}
          center={props.center}
          defaultZoom={11}
        >
          <Marker
            lat={props.center.lat}
            lng={props.center.lng}
            currentWeather={props.currentWeather}            
          />
        </GoogleMapReact>
      </div>
    );  
}

