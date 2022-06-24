import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from '../Pages/Dashboard'
import ForgotPassword from '../Pages/ForgotPassword'
import HomePage from '../Pages/HomePage'
import InserData from '../Pages/InsertData'
import Login from '../Pages/Login'
import PrivateScreen from '../Pages/PrivateScreen'
import Register from '../Pages/Register'
import ResetPassword from '../Pages/ResetPassword'
import Series from '../Pages/Series'
import SeriesAllData from '../Pages/SeriesAllData'
import Footer from './Footer'
import Header from './Menu/Header'
import PrivateRoute from './Routing/PrivateRoute'

const RoutesPage = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route exact path="/" element={
                        <PrivateScreen />
                } />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/register' element={<Register />} />
                <Route exact path='/forgotpassword' element={<ForgotPassword />} />
                <Route exact path='//resetPassword:resetToken' element={<ResetPassword />} />
                <Route exact path='/home' element={<HomePage />} />
                <Route path='/insertData' element={<InserData />} />
                <Route exact path='/seriedata' element={<SeriesAllData />} />
                <Route exact path='/seriedata/:_id' element={<Series />} />
                <Route exact path='/dashboard' element={<Dashboard />} />
                <Route path='*' element={""} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default RoutesPage