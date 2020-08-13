export const months = {
    1: 'January',
    2: 'February',
    3: 'March', 
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
}

export const week = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
}

const currentDate = new Date()
const fullDate = {
    year: currentDate.getFullYear(),
    month: months[currentDate.getMonth() + 1],
    day: currentDate.getDate()
}
export const {year, month, day} = fullDate;

//====================================================

export const convertTime = (dateToConvert) => {
    const date = new Date(dateToConvert);
    const hour = ('00' + date.getHours()).slice(-2);
    const minute = ('00' + date.getMinutes()).slice(-2);

    return `${hour}:${minute}`;
}

//======================================================

export const groupForecastsByDay = (forecast, setForecastGroup) => {
    
    const group = []
    let groupItem = []
    for (let i = 0; i < forecast.length; i++) {
        const forecastDateCurrent = new Date(forecast[i].date)
        const forecastDateNext = i === (forecast.length - 1) ? new Date(forecast[i].date) : new Date(forecast[i + 1].date)

        if (i === forecast.length - 1) {
            groupItem.push(forecast[i])
            group.push(groupItem)
            groupItem = []
        } else if (forecastDateCurrent.getDate() === forecastDateNext.getDate()) {
            groupItem.push(forecast[i])
        } else {
            groupItem.push(forecast[i])
            group.push(groupItem)
            groupItem = []
        }
    }
    console.log(group)
    setForecastGroup(group)

}