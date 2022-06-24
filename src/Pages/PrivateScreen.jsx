import React, { useState, useEffect } from 'react'
import axios from 'axios'
import HomePage from '../Pages/HomePage'
import { useNavigate } from 'react-router-dom';

const PrivateScreen = () => {
    let navigate = useNavigate();
    const [error, setError] = useState("")
    const [privateData, setPrivateData] = useState("")

    useEffect(() => {
        if (!localStorage.getItem("authToken")) {
            navigate("/login", {replace: true})
        }

        const fetchPrivateData = async () => {
            const config = {
                header: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("authToken")
                },
            };

            try {
                const { data } = await axios.get("http://localhost:9000/api/private", config)
                setPrivateData(data.data)
                console.log(data)
            } catch (error) {
                localStorage.removeItem("authToken")
                setError("No estas autorizado aun, favor de iniciar sesion")
                console.log(error)
            }
        }

        fetchPrivateData()
    }, [])

    const logoutHandler = () => {
        localStorage.removeItem("authToken")
        navigate("/login", {replace: true})
    }

    return (
        error ?
            <>
                <span>{error}</span>
                <button onClick={logoutHandler}>Cerrar Sesion</button>
            </>
            :
            <>
                <button onClick={logoutHandler}>Cerrar Sesion</button>
                <HomePage />
            </>
    )
}

export default PrivateScreen