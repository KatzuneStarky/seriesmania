import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../Styles/Series.scss'

const SeriesAllData = () => {
    const [serieData, setSerieData] = useState([])
    const [loading, setLoading] = useState(true)

    fetch("http://localhost:9000/api/series").then((res) => {
        if(res.ok){
            return res.json()
        }
    }).then((data) => {
        const newPorduct = data
        setSerieData(newPorduct)
        setLoading(false)
    })
    return (
        <div>
            { loading && <p>Load</p>}
            {
                !loading && serieData.map((serie) => (
                    <div key={serie._id} className="cardSerie">
                        <div className="left">
                            <img src={"https://1000marcas.net/wp-content/uploads/2021/04/Adventure-Time-Logo.png"} alt="" />
                        </div>
                        <div className="right">
                            <img src={serie.imageUrl} alt="" />
                            <div className="serieInfo">
                                <h1>{serie.name}</h1>
                                <h2>Numero de capitulos: {serie.numCaps}</h2>
                                <div className="description">
                                    <div className="desc">
                                        <p>{serie.description}</p>
                                    </div>
                                    <div className="calificacion">
                                        <h3>4.5</h3>
                                        <h4>Calificacion <br /> de la serie</h4>
                                        <Link className='linkTo' to={`/seriedata/${serie._id}`}>Ver serie</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default SeriesAllData