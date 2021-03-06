import axios from 'axios';
import moment from 'moment';



const spott = axios.create({
    baseURL: 'https://spott.p.rapidapi.com/places/',
    headers: {
        "x-rapidapi-host": "spott.p.rapidapi.com",
        "x-rapidapi-key": "3a4cfabe93mshb90fd56ad0ebea0p1c7a70jsn7872cae96840"
    }
});

const openweathermapAPI = 'b19682064db3bf90a7e8282c6eaf18ca'
const openweathermap = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/',
})



export const getIPAndCity = async () => {
    try {
        const location = await spott.get('ip/me').then(res => res.data)
        const result = {
            id: location.id,
            city: location.name,
            country: location.country.name,
            lat: location.coordinates.latitude,
            lon: location.coordinates.longitude
        }
        return result;
    } catch (err) {
        alert(`${err.message} in getIPAndCity`)
    }
}



export const getCityList = async (city) => {
    try {
        const cityList = await spott.get(`autocomplete?q=${city}&limit=15&skip=0&type=CITY`)
            .then(res => res.data)
        return cityList
    } catch (err) {
        alert(`${err.message} in getCityList`)
    }
}



export const getCurrentWeather = async (lat, lon) => {
    try {
        const weather = await openweathermap.get(`weather?lat=${lat}&lon=${lon}&units=metric&appid=${openweathermapAPI}`)
            .then(res => res.data)
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



export const getForecast = async (lat, lon, option) => {
    try {
        const forecast = await openweathermap.get(`forecast?lat=${lat}&lon=${lon}&units=metric&appid=${openweathermapAPI}`)
            .then(res => res.data)

        const currentDate = new Date()
        const filteredForecast = forecast.list.filter(forecast => {
            const forecastDate = new Date(forecast.dt_txt)
            const forecastDateMS = forecastDate.getTime()
            const currentDateMS = currentDate.getTime()
            const endOfTheCurrentDayMS = moment(currentDateMS).endOf('day').toDate().getTime()
            if (option === 'today') {
                return forecastDate.getDate() === currentDate.getDate()
            } else if (option === 'tomorrow') {
                return (forecastDateMS > endOfTheCurrentDayMS && forecastDateMS < (endOfTheCurrentDayMS + 24 * 3600 * 1000))
            } else {
                return true
            }
        })

        const result = filteredForecast.map(forecast => {
            forecast.main.temp = Math.round(forecast.main.temp)
            forecast.wind.speed = Math.round(forecast.wind.speed)
            return {
                date: forecast.dt_txt,
                temp: forecast.main.temp,
                weather: forecast.weather[0].main,
                wind: forecast.wind.speed
            }
        })
        return result
    } catch (err) {
        alert(`${err.message} in getForecast`)
    }
}



export const getLocationById = async (locId) => {
    try {
        const location = await spott.get(`${locId}`).then(res => res.data)
        const result = {
            id: location.id,
            city: location.name,
            country: location.country.name,
            lat: location.coordinates.latitude,
            lon: location.coordinates.longitude
        }
        return result;
    } catch (err) {
        alert(`${err.message} in getLocationById`)
    }
}



