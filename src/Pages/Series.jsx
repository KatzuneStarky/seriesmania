import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Loading from '../Components/Loading'
import { useTimeout } from 'usehooks-ts'

const Series = () => {

    const { _id } = useParams()
    const [serieData, setSerieData] = useState([])
    const [loading, setLoading] = useState(true)

    fetch("http://localhost:9000/api/series").then((res) => {
        if(res.ok){
            return res.json()
        }
    }).then((data) => {
        const newPorduct = data.find((item) => item._id === _id)
        setSerieData(newPorduct)
        setLoading(false)
    })


    return (
        <div className='serieData'>
            { loading && <Loading />}
            {!loading &&
                <>
                    <p>{serieData.name || <Skeleton />}</p>
                    <p>{serieData.description || <Skeleton />}</p>
                    <img src={serieData.imageUrl || <Skeleton />} alt="" style={{"width" : "100px"}} />
                </>
            }
        </div>
    )
}

export default Series