import React from 'react'
import './style.css'

const Loder = () => {
    return (
        <div className='loaderContainer'>
            <div className="loading-wave">
                <div className="loading-bar"></div>
                <div className="loading-bar"></div>
                <div className="loading-bar"></div>
                <div className="loading-bar"></div>
            </div>
            <p>Free Server.. May take some time...</p>
        </div>
    )
}

export default Loder