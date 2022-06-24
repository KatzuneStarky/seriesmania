import React, { useState } from "react";
import "../Styles/Login.scss";
import LoginComponent from "../Components/LoginComponent";

const Login = () => {
    const [container, setContainer] = useState("inital");
    const [logoClass, setLogoClass] = useState("logo");

    const changeContainerState = () => {
        if (container === 'inital') {
            setContainer("changed");
            setLogoClass("logo color");
        } else if (container !== 'inital') {
            setContainer("inital");
            setLogoClass("logo");
        }
    };

    return (
        <div className="login-container">
            <LoginComponent
                container={container}
                changeContainerState={changeContainerState}
                logoClass={logoClass}
            />
        </div>
    );
};

export default Login;
