import React from 'react'

const ImageSlider = ({ color, image, number, nSerie, desc }) => {
    return (
        <>
            <div className="swiper-item" style={{ backgroundImage: `url(${image})` }}></div>
            <span className="number">{number}</span>
            <div className="slide-text" style={{ backgroundColor: `${color}` }}>
                <h1>{nSerie}</h1>
                <p>{desc}</p>
                <button className="btn">Ver serie</button>
            </div>
        </>
    )
}

export default ImageSlider