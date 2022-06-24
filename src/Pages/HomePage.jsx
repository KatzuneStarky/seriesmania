import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Slider from '../Components/Slider'

const HomePage = () => {
    let navigate = useNavigate();
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("http://localhost:9000/api/series")
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
            <button onClick={logoutHandler}>Cerrar Sesion</button>
            <div>
                <Slider infinite timer={5000}>
                    <img src={"https://images8.alphacoders.com/442/442432.jpg"} alt="" />
                    <img src={"https://images5.alphacoders.com/312/312856.png"} alt="" />
                    <img src={"https://images8.alphacoders.com/442/442432.jpg"} alt="" />
                    <img src={"https://images5.alphacoders.com/312/312856.png"} alt="" />
                </Slider>
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