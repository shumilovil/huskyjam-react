import axios from 'axios';

const geoDB = axios.create({
    baseURL: 'https://wft-geo-db.p.rapidapi.com/v1/',
    headers: {
        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
        "x-rapidapi-key": "4f66a1f512msh1ad70d75f930c7ap16c1a0jsn76b11867e939",
        "useQueryString": true
    }
});

const openweathermapAPI = 'b19682064db3bf90a7e8282c6eaf18ca'
const openweathermap = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/',
})

export const getIPAndCity = async () => {
    try {
        const ip = await axios.get('https://ipapi.co/ip/').then(res => res.data)
        const currentLocation = await axios.get(`http://ip-api.com/json/${ip}`).then(res => res.data)
        const result = {
            city: currentLocation.city,
            country: currentLocation.country,
            lat: currentLocation.lat,
            lon: currentLocation.lon
        }
        return result;
    } catch (err) {
        alert(`${err.message} in getIPAndCity`)
    }
}

export const getCurrentWeather = async (lat, lon) => {
    try {
        const weather = await openweathermap.get(`weather?lat=${lat}&lon=${lon}&units=metric&appid=${openweathermapAPI}`).then(res => res.data)
        weather.main.temp = Math.round(weather.main.temp)
        weather.wind.speed = Math.round(weather.wind.speed)        
        const result = {
            temp: weather.main.temp,
            weather: weather.weather[0].main,
            wind: weather.wind.speed
        }
        return result
    } catch (err) {
        alert(`${err.message} in getCurrentWeather`)
    }
}


const rate = 1500; // throttling due to server limitation
const throttle = require("promise-ratelimit")(rate); // throttling due to server limitation
export const getCityList = async (city) => {
    await throttle();
    try {
        const cityList = await geoDB.get(`geo/cities?namePrefix=${city}&types=CITY&limit=10`).then(res => res.data).then(res => res.data)
        return cityList
    } catch (err) {
        alert(`${err.message} in getCityList`)
    }
}