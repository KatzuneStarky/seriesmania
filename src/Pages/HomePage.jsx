import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import '../Styles/ImageSlider.scss'
import SliderData from '../SlideData'
import ImageSlider from '../Components/ImageSlider'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


const HomePage = () => {
    let navigate = useNavigate();
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("https://series-mania-api.herokuapp.com/api/series")
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
            })
    }, [])

    const logoutHandler = () => {
        localStorage.removeItem("authToken")
        navigate("/")
    }

    return (
        <>
            {/* <button onClick={logoutHandler}>Cerrar Sesion</button> */}
            <div>
                <Swiper
                    cssMode={true}
                    navigation={true}
                    pagination={true}
                    mousewheel={true}
                    keyboard={true}
                    modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                    className="swiper-container"
                >
                    <div className="swiper-wrapper">
                        {
                            SliderData.map((data, index) => (
                                <SwiperSlide key={index} style={{ backgroundColor: `${data.color}` }}>
                                    <ImageSlider
                                        color={data.color}
                                        image={data.image}
                                        number={data.number}
                                        desc={data.desc}
                                        nSerie={data.nSerie}
                                    />
                                </SwiperSlide>
                            ))
                        }
                    </div>
                </Swiper>
                {loading && <p>Load</p>}
                {
                    !loading && data.map((serie) => (
                        <div key={serie.name}>
                            <Link to={`/seriedata/${serie._id}`}>{serie.name || <Skeleton />}</Link>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default HomePage