import React, { useState, useEffect } from "react";
import "../Styles/Login.scss";
import logo from "../Images/logotmp.png";
import { BiMoviePlay } from "react-icons/bi";
import {
    AiFillFacebook,
    AiFillTwitterSquare,
    AiOutlineMail,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { motion } from "framer-motion";

const leftSideVariants = {
    hidden: {
        opacity: 0,
        x: -700,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: { delay: 0.15, duration: 0.75, type: "tween" },
    },
};

const formVariants = {
    hidden: {
        opacity: 0,
        x: 700,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: { delay: 0.15, duration: 0.75, type: "tween" },
    },
};

const formRightVariants = {
    hidden: {
        opacity: 0,
        x: -700,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: { delay: 0.15, duration: 0.75, type: "tween" },
    },
};

const rightSideVariants = {
    hidden: {
        opacity: 0,
        x: 700,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: { delay: 0.15, duration: 0.75, type: "tween" },
    },
};

const buttonVariants = {
    hover: {
        scale: 1.1,
        transition: {
            yoyo: Infinity,
        },
    },
    pressed: {
        scale: 0.9
    }
};

const logoVariants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: { delay: 0.15, duration: 0.75, type: "tween" }
    }
}

const forgotPassVariant = {
    hover: {
        scale: 1.1
    }
}

const LoginComponent = ({ container, changeContainerState, logoClass}) => {
    let navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState("");

    useEffect(() => {
        if(localStorage.getItem("authToken")){
            navigate("/", {replace: true})
        }
    }, [navigate])

    const loginHandler = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };

        try {
            const { data } = await axios.post(
                "http://localhost:9000/api/auth/login",
                { email, password },
                config
            );
            localStorage.setItem("authToken", data.token)
            navigate("/", {replace: true})
        } catch (error) {
            setError(error.response.data.error)
            setTimeout(() => {
                setError("");
            }, 5000);
            console.log(error)
        }
    }
    

    const handleChange = () => {
        changeContainerState();
    };

    return (
        <div className="main-box">
            <motion.div className={logoClass} variants={logoVariants} initial="hidden" animate="visible">
                <div className="icon">
                    <BiMoviePlay size={24} />
                </div>
                <div className="logo-text">Series Mania</div>
            </motion.div>
            {container === "inital" && (
                <>
                    <motion.div
                        className="left-side"
                        variants={leftSideVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h1>Bienvenido a series mania</h1>
                        <p>
                            Mantente conectado para ver todo lo que te espera
                            <br />
                            Ingresa tu informacion de logeo aqui
                        </p>
                        <motion.button
                            onClick={handleChange}
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap={"pressed"}
                        >
                            Iniciar sesion
                        </motion.button>
                    </motion.div>
                    <motion.div
                        className="right-side"
                        variants={rightSideVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <img src={logo} alt="" className="rightSide-img" />
                    </motion.div>
                </>
            )}
            {container === "changed" && (
                <>
                    <motion.div className="form-section" variants={formVariants} initial="hidden" animate="visible">
                        <h1>Inicia Sesion con</h1>
                        <div className="icons">
                            <div className="icon">
                                <AiFillFacebook color="#1773ea" size={24} />
                            </div>
                            <div className="icon">
                                <FcGoogle size={24} />
                            </div>
                            <div className="icon">
                                <AiFillTwitterSquare color="#00acee" size={24} />
                            </div>
                        </div>
                        <p>O usa tu correo electronico</p>
                        <form onSubmit={loginHandler}>
                            <div className="custom-input">
                                <div className="iconForm">
                                    <AiOutlineMail color="black" size={18} />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={email}
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Correo electronico"
                                />
                            </div>

                            <div className="custom-input">
                                <div className="iconForm">
                                    <RiLockPasswordLine color="black" size={18} />
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={password}
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Contraseña"
                                />
                            </div>
                            <motion.div className="forget-label" variants={forgotPassVariant} whileHover="hover" >
                                Olvido su contraseña?
                                <br />
                            </motion.div>
                            <motion.div className="forget-label" variants={forgotPassVariant} whileHover="hover">
                                Nuevo aqui? <Link to={"/register"}>Registrate</Link>
                            </motion.div>
                            <br />
                            <motion.button
                                type="submit"
                                className="register-button"
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap={"pressed"}
                            >
                                Iniciar Sesion
                            </motion.button>
                        </form>
                    </motion.div>
                    <motion.div className="form-right" variants={formRightVariants} initial="hidden" animate="visible">
                        <h1>Bienvenido seas</h1>
                        <p>Aqui encontraras un sin fin de serie para ver</p>
                        <div className="img">
                            <img src={logo} alt="" />
                        </div>
                    </motion.div>
                </>
            )}
        </div>
    );
};

export default LoginComponent;
