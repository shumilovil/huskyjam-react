import React from 'react';
import './App.css';
import {  getCurrentWeather, getForecast, getLocationById } from './api';
import { useState } from 'react';
import { useEffect } from 'react';
import HeaderWithRouter from './Components/Header/Header';
import { Switch, Route } from 'react-router-dom';
import SingleDayWithRouter from './Components/SingleDay/SingleDay';
import { Home } from './Components/Home/Home';
import SeveralDaysWithRouter from './Components/SeveralDays/SeveralDays';


function App() {

    const [currentLocation, setCurrentLocation] = useState({
        id: '',
        city: '',
        country: '',
        lat: '',
        lon: ''
    });
    const [currentWeather, setCurrentWeather] = useState({
        temp: '',
        weather: '',
        wind: ''
    });
    const [savedLocations, setSavedLocations] = useState([])
    const [currentForecastPeriod, setCurrentForecastPeriod] = useState('today')
    const [locationIdToSave, setLocationIdToSave] = useState(null)
    const [locationIdToRemove, setLocationIdToRemove] = useState(null)


    const getSavedLocations = () => {
        const localStorageArray = Object.values(localStorage);
        const parsedLocalStorage = []
        for (let location of localStorageArray) {
            parsedLocalStorage.push(JSON.parse(location))
        }
        console.log(parsedLocalStorage)
        setSavedLocations(parsedLocalStorage)
    }

    const setLocationById = async (locId) => {
        const location = await getLocationById(locId)
        setCurrentLocation(location)
    }

    useEffect(() => {
        if (currentLocation.lat && currentLocation.lon) {
            getCurrentWeather(currentLocation.lat, currentLocation.lon)
                .then(res => setCurrentWeather(res))
        }
    }, [currentLocation])

    useEffect(() => {
        console.log('locationIdToSave');
        console.log(locationIdToSave);
        if (locationIdToSave) {
            localStorage.setItem(locationIdToSave, JSON.stringify(currentLocation));
            getSavedLocations()
        }
        return () => {
            setLocationIdToSave(null)
        }
    }, [locationIdToSave])

    useEffect(() => {
        console.log('locationIdToRemove');
        console.log(locationIdToRemove);
        if (locationIdToRemove) {
            localStorage.removeItem(locationIdToRemove);
            getSavedLocations()
        }
        return () => {
            setLocationIdToRemove(null)
        }        
    }, [locationIdToRemove])


    return (
        <div className="App">
            <HeaderWithRouter setCurrentLocation={setCurrentLocation}
                currentLocationId={currentLocation.id}
                setLocationById={setLocationById}
                currentForecastPeriod={currentForecastPeriod} />

            <Switch>

                <Route exact path='/' render={() => <Home
                    setCurrentLocation={setCurrentLocation}
                    currentLocation={currentLocation}
                    currentWeather={currentWeather}
                    savedLocations={savedLocations}
                    getSavedLocations={getSavedLocations}
                    setCurrentForecastPeriod={setCurrentForecastPeriod}
                    setLocationIdToSave={setLocationIdToSave}
                    setLocationIdToRemove={setLocationIdToRemove}                    
                />
                } />

                <Route path='/:locId?/today' render={() => <SingleDayWithRouter
                    option='today'
                    getForecast={getForecast}
                    currentLocation={currentLocation}
                    currentWeather={currentWeather}
                    getSavedLocations={getSavedLocations}
                    setLocationById={setLocationById}
                    setCurrentForecastPeriod={setCurrentForecastPeriod}
                    setLocationIdToSave={setLocationIdToSave}     
                />
                } />

                <Route path='/:locId?/tomorrow' render={() => <SingleDayWithRouter
                    option='tomorrow'
                    getForecast={getForecast}
                    currentLocation={currentLocation}
                    currentWeather={currentWeather}
                    getSavedLocations={getSavedLocations}
                    setLocationById={setLocationById}
                    setCurrentForecastPeriod={setCurrentForecastPeriod}
                    setLocationIdToSave={setLocationIdToSave}     
                />
                } />

                <Route path='/:locId?/severaldays' render={() => <SeveralDaysWithRouter
                    option='severaldays'
                    getForecast={getForecast}
                    currentLocation={currentLocation}
                    currentWeather={currentWeather}
                    getSavedLocations={getSavedLocations}
                    setLocationById={setLocationById}
                    setCurrentForecastPeriod={setCurrentForecastPeriod}
                    setLocationIdToSave={setLocationIdToSave}     
                />
                } />
            </Switch>

        </div>
    );
}

export default App;
