import React from 'react';
import markerImage from './Marker.png'
import './Marker.css'
import { useState } from 'react';

export const Marker = ({ currentWeather }) => {

    const [isMarkerWeatherVisible, setMarkerWeatherVisibility] = useState(false)

    const toggleVisibility = () => {
        setMarkerWeatherVisibility(!isMarkerWeatherVisible)
    }


    return (
        <div className='mapMarker'>
            <img src={markerImage} alt="" onClick={toggleVisibility} />
            {isMarkerWeatherVisible &&
                <div>
                    <div className='markerWeather'>
                        <div>Now:</div>
                        <div>{currentWeather.temp} °C</div>
                        <div>{currentWeather.weather} </div>
                        <div>Wind: {currentWeather.wind} m/s</div>
                    </div>
                    <div className='closeMarkerWeather' onClick={toggleVisibility}>Close</div>
                </div>}
        </div>
    )
}