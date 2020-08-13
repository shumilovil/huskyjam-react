import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { convertTime, week, months } from '../../helpers/commonHelpers'
import { groupForecastsByDay } from '../../helpers/commonHelpers'
import './SeveralDays.css'
import { withRouter } from 'react-router-dom';

const SeveralDays = ({ currentLocation, getForecast, option, match,
    setLocationById, setCurrentForecastPeriod }) => {

    const [forecast, setForecast] = useState([])
    const [forecastGroup, setForecastGroup] = useState([])
    const [firstDate, setFirstDate] = useState('')
    const [lastDate, setLastDate] = useState('')

    useEffect(() => {
        console.log('Single');
        if (match.params.locId) {
            setLocationById(match.params.locId)
        }
    }, [match.params.locId])

    useEffect(() => {
        console.log('Option');
        setCurrentForecastPeriod(option)
    }, [option])

    useEffect(() => {
        if (currentLocation.lat && currentLocation.lon) {
            getForecast(currentLocation.lat, currentLocation.lon, option)
                .then((res) => setForecast(res))
        }
    }, [currentLocation, option])

    useEffect(() => {
        if (forecast.length !== 0) {
            groupForecastsByDay(forecast, setForecastGroup)
        }

    }, [forecast])

    useEffect(() => {
        if (forecast.length !== 0) {
            setFirstDate(new Date(forecast[0].date))
            setLastDate(new Date(forecast[forecast.length - 1].date))
        }
    }, [forecast])


    return (
        <div>
            <div className='forecastRange'>
                {
                    (firstDate && lastDate)
                    && <h1>{months[firstDate.getMonth() + 1]}, {firstDate.getDate()} - {months[lastDate.getMonth() + 1]}, {lastDate.getDate()}</h1>
                }
            </div>
            <div className='forecastContainer'>
                {
                    forecastGroup.map((group, index) => {
                        const groupDate = new Date(group[0].date)
                        const groupWeekDay = week[groupDate.getDay()]
                        const groupDay = groupDate.getDate()
                        const groupMonth = months[groupDate.getMonth() + 1]

                        return (
                            <div key={index} className='forecastGroup'>
                                <div className='forecastGroupDate'>
                                    <div>{groupWeekDay}</div>
                                    <div>{groupMonth}, {groupDay}</div>
                                </div>
                                {
                                    group.map((singleForecast, index) => {
                                        return (
                                            <div key={index}>
                                                {convertTime(singleForecast.date)} - {singleForecast.temp}°C, {singleForecast.weather}, Wind: {singleForecast.wind} m/s
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

const SeveralDaysWithRouter = withRouter(SeveralDays)

export default SeveralDaysWithRouter
