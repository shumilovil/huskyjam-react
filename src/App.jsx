import React from 'react';
import './App.css';
import { getIPAndCity, getCurrentWeather } from './api';
import { useState } from 'react';
import { useEffect } from 'react';
import { Home } from './Components/Home/Home';
import { Navbar } from './Components/Navbar/Navbar';
import { Switch, Route } from 'react-router-dom';
import { Today } from './Components/Today/Today';



function App() {

    const [currentLocation, setCurrentLocation] = useState({
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
  /*   const [todayForecast, setTodayForecast] */


    useEffect(() => {
        getIPAndCity().then(res => setCurrentLocation(res))
    }, [])


    useEffect(() => {
        if (currentLocation.lat && currentLocation.lon) {
            getCurrentWeather(currentLocation.lat, currentLocation.lon).then(res => setCurrentWeather(res))
        }
    }, [currentLocation])


    return (
        <div className="App">
            <Navbar setCurrentLocation={setCurrentLocation} />
            <Switch>

                <Route exact path='/' render={() => <Home
                    currentLocation={currentLocation}
                    currentWeather={currentWeather}
                />
                } />

                <Route path='/today' render={() => <Today
                    currentLocation={currentLocation}
                    currentWeather={currentWeather}
                />
                } />
            </Switch>

        </div>
    );
}

export default App;
