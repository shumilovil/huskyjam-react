import React from 'react';
import { year, month, day } from '../../helpers/commonHelpers';
import './ManCity.css'

export const MainCity = ({ currentLocation, currentWeather, setLocationIdToSave }) => {

    const saveCity = () => {
        setLocationIdToSave(currentLocation.id);
    }

    return (
        <div className='mainCity'>
            <div>{currentLocation.city}, {currentLocation.country}</div>
            <div>{year}, {month} {day}</div>
            <div>{currentWeather.temp} °C, {currentWeather.weather}, Wind: {currentWeather.wind} m/s</div>
            <div className='addButton' onClick={saveCity}>+</div>
        </div>
    )
}