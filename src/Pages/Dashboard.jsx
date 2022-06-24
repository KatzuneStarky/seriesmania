import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate()

    async function populateQuote(){
        const req = await fetch('http://localhost:9000/api/quote', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
        const data = await req.json()

        if(data.status === 'ok'){
            navigate('/')
        }

        console.log(data)
    }

    // useEffect(() => {
    //     const token = localStorage.getItem('token')
    //     if(token){
    //         const user = jwt.decode(token)
    //         if(!user){
    //             localStorage.removeItem('token')
    //             navigate('/login')
    //         }else{
    //             populateQuote()
    //         }
    //     }
    // })
    return (
        <div>Dashboard</div>
    )
}

export default Dashboard