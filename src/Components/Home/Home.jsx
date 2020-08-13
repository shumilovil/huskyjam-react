import React from 'react';
import { MainCity } from '../MainCity/MainCity';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { getIPAndCity } from '../../api';
import './Home.css'

export const Home = ({ currentLocation, setCurrentLocation, currentWeather, getSavedLocations,
    savedLocations, setCurrentForecastPeriod, setLocationIdToSave, setLocationIdToRemove }) => {

    useEffect(() => {
        getSavedLocations()
    }, [])

    useEffect(() => {
        console.log('Home getIPAndCity');
        getIPAndCity().then(res => setCurrentLocation(res))
        setCurrentForecastPeriod('today')
    }, [setCurrentLocation])

    const removeSavedLocation = (locId) => {
        setLocationIdToRemove(locId)
    }

    return (
        <div>
            <MainCity currentLocation={currentLocation}
                currentWeather={currentWeather}
                getSavedLocations={getSavedLocations}
                setLocationIdToSave={setLocationIdToSave} />

            <h1>Saved cities</h1>

            <div className='savedLocationsWrapper'>
                {
                    savedLocations.map(location => {
                        return (
                            <div key={location.id} className='singleSavedLocationWrapper'>
                                <NavLink to={`/${location.id}/today`}>
                                    <div className='singleSavedLocation'>
                                        <div>{location.city}, {location.country}</div>
                                    </div>
                                </NavLink>
                                <div className='removeLocation' onClick={() => { removeSavedLocation(location.id) }}>+</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}