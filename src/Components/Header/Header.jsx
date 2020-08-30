import React, { useState, useEffect } from 'react';
import './Header.css'
import { getCityList } from '../../api';
import Select from 'react-select';
import { NavLink, withRouter } from 'react-router-dom';

const customStyles = {
    option: (styles) => ({
        ...styles,
        cursor: 'pointer'
    }),
    control: (styles) => ({
        ...styles,
        cursor: 'pointer'
    })
}

export const Header = ({ setLocationById, currentLocationId, history, currentForecastPeriod }) => {

    const [cityValue, setCityValue] = useState("");
    const [cityList, setCityList] = useState([]);
    const [optionsList, setOptionsList] = useState([]);

    useEffect(() => {
        const options = cityList.map(option => {
            return {
                id: option.id,
                value: option.id,
                label: `${option.name}, ${option.country.name}`                
            }
        })
        setOptionsList(options)
    }, [cityList])

    const onValueChange = (value) => {
        setCityValue(value);
        if (value) {
            setLocationById(value.id)
            history.push(`/${value.id}/${currentForecastPeriod}`);
        }
    };

    const onInputChange = (value) => {
        if (value) {
            setCityValue(value)
            getCityList(value)
                .then(res => setCityList(res))
        } else {
            setCityList([])
        }
    }

    return (
        <div className='header'>
            <div className='headerLeft'>
                <div className='item'>
                    <NavLink exact to='/' activeClassName='activeLink'>Home</NavLink>
                </div>
                <div className='item'>
                    <NavLink to={`/${currentLocationId}/today`} activeClassName='activeLink' >Today</NavLink>
                </div>
                <div className='item'>
                    <NavLink to={`/${currentLocationId}/tomorrow`} activeClassName='activeLink' >Tomorrow</NavLink>
                </div>
                <div className='item'>
                    <NavLink to={`/${currentLocationId}/severaldays`} activeClassName='activeLink' >Several days</NavLink>
                </div>
            </div>
            <div className='selectCity'>
                <Select
                    options={optionsList}
                    onChange={onValueChange}
                    onInputChange={onInputChange}
                    value={cityValue}
                    isClearable={true}
                    styles={customStyles}
                    placeholder='Type your city here'
                    isSearchable={true}
                    noOptionsMessage={() => { return 'Type your city above' }}
                />
            </div>
        </div>
    )
}

const HeaderWithRouter = withRouter(Header)

export default HeaderWithRouter

