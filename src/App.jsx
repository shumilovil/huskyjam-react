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
                />
                } />
            </Switch>

        </div>
    );
}

export default App;
