import React, { useState } from 'react'
import RegisterComponent from '../Components/RegisterComponent';
import '../Styles/Login.scss'

const Register = () => {
    const [container, setContainer] = useState("changed");
    const [logoClass, setLogoClass] = useState("logo color");

    return (
        <div className="login-container">
            <RegisterComponent
                container={container}
                logoClass={logoClass}
            />
        </div>
    )
}

export default Register