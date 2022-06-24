import React, { useEffect, useState } from "react";
import "../Styles/Login.scss";
import logo from "../Images/logotmp.png";
import { BiMoviePlay, BiArrowBack } from "react-icons/bi";
import {
    AiFillFacebook,
    AiFillTwitterSquare,
    AiOutlineMail,
    AiOutlineUser,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { RiLockPasswordLine } from "react-icons/ri";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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

const buttonVariants = {
    hover: {
        scale: 1.1,
        transition: {
            yoyo: Infinity,
        },
    },
    pressed: {
        scale: 0.9,
    },
};

const logoVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: { delay: 0.15, duration: 0.75, type: "tween" },
    },
};

const forgotPassVariant = {
    hover: {
        scale: 1.1,
    },
};

const RegisterComponent = ({ container, logoClass}) => {
    let navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if(localStorage.getItem("authToken")){
            navigate("/")
        }
    }, [navigate])

    const registerHandler = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };

        if (password !== confirmPassword) {
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => {
                setError("");
            }, 5000);
            return setError("Las contraseñas no coinciden");
        }

        try {
            const { data } = await axios.post(
                "http://localhost:9000/api/auth/register",
                { username, email, password },
                config
            );
            localStorage.setItem("authToken", data.token)
            navigate("/")
        } catch (error) {
            setError(error.response.data.error)
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    return (
        <div className="main-box">
            { error && <span>{error}</span> }
            <motion.div
                className={logoClass}
                variants={logoVariants}
                initial="hidden"
                animate="visible"
            >
                <Link to={"/login"} className="back">
                    <BiArrowBack size={24} /> Regresar
                </Link>
                <div className="icon">
                    <BiMoviePlay size={24} />
                </div>
                <div className="logo-text">Series Mania</div>
            </motion.div>
            {container === "changed" && (
                <>
                    <motion.div
                        className="form-section"
                        variants={formVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h1>Registrate con</h1>
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
                        <p>O crea tu cuenta con los siguientes datos</p>
                        <form onSubmit={registerHandler}>
                            <div className="custom-input">
                                <div className="iconForm">
                                    <AiOutlineUser color="black" size={18} />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Nombre de usuario"
                                />
                            </div>

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

                            <div className="custom-input">
                                <div className="iconForm">
                                    <RiLockPasswordLine color="black" size={18} />
                                </div>
                                <input
                                    type="password"
                                    name="confirmpassword"
                                    id="confirmpassword"
                                    value={confirmPassword}
                                    required
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirmar Contraseña"
                                />
                            </div>

                            <motion.div
                                className="forget-label"
                                variants={forgotPassVariant}
                                whileHover="hover"
                            >
                                Ya tienes cuenta? <Link to={"/login"}>Inicia Sesion</Link>
                            </motion.div>
                            <br />
                            <motion.button
                                type="submit"
                                className="register-button"
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap={"pressed"}
                            >
                                Registrarse
                            </motion.button>
                        </form>
                    </motion.div>
                    <motion.div
                        className="form-right"
                        variants={formRightVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h1>Proceso de Registro</h1>
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

export default RegisterComponent;
