import React from "react";
import {
    AiFillFacebook,
    AiOutlineWhatsApp,
    AiOutlineMail,
    AiOutlineArrowRight
} from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";
import { BsTelegram, BsPhone } from "react-icons/bs";
import { BiMap, BiWorld } from "react-icons/bi";
import { Link } from "react-router-dom";
import "../Styles/Footer.scss";

const Footer = () => {
    return (
        <footer>
            <div className="row">
                <div className="col">
                    <img src="" alt="" className="logoImg" />
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi amet
                        neque veritatis facere, saepe temporibus assumenda quibusdam dolorum
                        nesciunt iure asperiores a, dolore doloremque aliquam nostrum
                        deserunt modi ad pariatur!
                    </p>
                </div>
                <div className="col">
                    <h3>Contacto <div className="underline"><span></span></div></h3>
                    <p><BiMap /> La Paz, Baja California Sur, México</p>
                    <p className="email-id"><AiOutlineMail /> <a href="mailto:aramirez_17@alu.uabcs.mx" target={"_blank"}> aramirez_17@alu.uabcs.mx</a></p>
                    <p><BiWorld /> <a href="https://katzunestarky.github.io/NewPortafolio/" target={"_blank"}> https://katzunestarky.github.io/NewPortafolio/</a></p>
                    <h4><BsPhone /> +52 6123050906</h4>
                </div>
                <div className="col">
                    <h3>Links <div className="underline"><span></span></div></h3>
                    <ul>
                        <li>
                            <Link to={"/"}>Inicio</Link>
                        </li>
                        <li>
                            <Link to={"/"}>Series</Link>
                        </li>
                        <li>
                            <Link to={"/"}>Galeria</Link>
                        </li>
                        <li>
                            <Link to={"/"}>Contacto</Link>
                        </li>
                    </ul>
                </div>
                <div className="col">
                    <h3>Recibe noticias <div className="underline"><span></span></div></h3>
                    <form>
                        <AiOutlineMail className="iconMail" />
                        <input type="email" placeholder="Ingresa tu correo electronico" required />
                        <button type="submit"><AiOutlineArrowRight className="arrow" /></button>
                    </form>
                    <div className="social-icons">
                        <AiFillFacebook className="socialIcon" />
                        <AiOutlineWhatsApp className="socialIcon" />
                        <FaDiscord className="socialIcon" />
                        <BsTelegram className="socialIcon" />
                    </div>
                </div>
            </div>
            <hr />
            <p className="copy">Wulune Productions © 2022 - Todos los derechos reservados</p>
        </footer>
    );
};

export default Footer;
