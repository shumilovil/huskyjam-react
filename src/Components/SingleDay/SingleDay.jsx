import React from 'react';
import { MainCity } from '../MainCity/MainCity';
import { useState } from 'react';
import { useEffect } from 'react';
import { convertTime } from '../../helpers/commonHelpers'
import { withRouter } from 'react-router-dom';
import { Map } from '../GoogleMap/GoogleMap'
import './SingleDay.css'


const SingleDay = ({ currentLocation, currentWeather, getForecast, option, getSavedLocations, 
    match, setLocationById, setCurrentForecastPeriod, setLocationIdToSave }) => {

    const [forecast, setForecast] = useState([])

    useEffect(() => {
        console.log('Single');
        if (match.params.locId) {
            setLocationById(match.params.locId)
        }
    }, [])

    useEffect(() => {
        setCurrentForecastPeriod(option)
    }, [option])

    useEffect(() => {
        if (currentLocation.lat && currentLocation.lon) {
            getForecast(currentLocation.lat, currentLocation.lon, option)
                .then((res) => setForecast(res))
        }
    }, [currentLocation, option, getForecast])


    return (
        <div>
            <MainCity currentLocation={currentLocation}
                currentWeather={currentWeather}
                getSavedLocations={getSavedLocations} 
                setLocationIdToSave={setLocationIdToSave}/>
            <div className='singleDayWrapper'>
                <div className='forecastSection'>
                    <h1>{option}</h1>
                    <div className='forecastTableRow'>
                        <p>Time</p>
                        <p>Weather</p>
                    </div>
                    {
                        forecast.map(singleForecast => {
                            return (
                                <div key={singleForecast.date} className='forecastTableRow'>
                                    <p> {convertTime(singleForecast.date)}</p> <p>{singleForecast.temp}°C, {singleForecast.weather}, Wind: {singleForecast.wind} m/s</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='mapSection'>
                    <Map center={{ lat: currentLocation.lat, lng: currentLocation.lon }}
                        currentWeather={currentWeather}
                    />
                </div>
            </div>
        </div>
    )
}



const SingleDayWithRouter = withRouter(SingleDay)

export default SingleDayWithRouter

