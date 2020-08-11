import React from 'react';
import { year, month, day } from '../../helpers/date';

export const Home = ({ currentLocation, currentWeather }) => {
    return (
        <div>
            <div>{currentLocation.city}, {currentLocation.country}</div>
            <div>{year}, {month} {day}</div>
            <div>{currentWeather.temp} °C, {currentWeather.weather}, Wind: {currentWeather.wind} m/s</div>
        </div>
    )
}