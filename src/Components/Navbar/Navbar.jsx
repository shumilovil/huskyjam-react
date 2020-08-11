import React, { useState } from 'react';
import './Navbar.css'
import { getCityList } from '../../api';
import Select from 'react-select';
import { NavLink } from 'react-router-dom';

const customStyles = {
    option: (styles, state) => ({
        ...styles,
        cursor: 'pointer'
    }),
    control: (styles) => ({
        ...styles,
        cursor: 'pointer'
    })
}


export const Navbar = (props) => {
    const [cityValue, setCityValue] = useState("");
    const [cityList, setCityList] = useState([]);

    const options = cityList.map(option => {
        return {
            value: option.id,
            label: `${option.name}, ${option.country}`,
            city: option.name,
            country: option.country,
            lat: option.latitude,
            lon: option.longitude
        }
    })

    const onValueChange = (value) => {
        setCityValue(value);
        if (value) {
            props.setCurrentLocation(value)
        }
    };

    const onInputChange = (value) => {
        if (value) {
            setCityValue(value)
            getCityList(value).then(res => setCityList(res))
            console.log(value)
        } else {
            setCityList([])
        }
    }

    return (
        <div className='navBar'>
            <div className='navBarLeft'>
                <div className='item'><NavLink exact={true} to='/' activeClassName='activeLink'>Home</NavLink></div>
                <div className='item'><NavLink to='/today' activeClassName='activeLink' >Today</NavLink></div>
                <div className='item'><NavLink to='/tomorrow' activeClassName='activeLink' >Tomorrow</NavLink></div>
                <div className='item'><NavLink to='/fivedays' activeClassName='activeLink' >5 days</NavLink></div>
            </div>
            <div className='selectCity'>
                <Select
                    options={options}
                    onChange={onValueChange}
                    onInputChange={onInputChange}
                    value={cityValue}
                    isClearable={true}
                    styles={customStyles}
                />
            </div>
        </div>
    )
}