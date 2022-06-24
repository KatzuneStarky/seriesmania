import gsap from "gsap";
import React, { useEffect } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import seriesData from "../../data";
import "../../Styles/Header.scss";

const Hamburger = ({ state }) => {
    let menu = useRef(null);
    let revealMenu = useRef(null);
    let revealMenuBackground = useRef(null);
    let cityBackground = useRef(null);
    let line1 = useRef(null);
    let line2 = useRef(null);
    let line3 = useRef(null);
    let line4 = useRef(null);
    let info = useRef(null);

    useEffect(() => {
        if (state.clicked === false) {
            gsap.to([revealMenu, revealMenuBackground], {
                duration: 0.8,
                height: 0,
                ease: "power3.inOut",
                stagger: {
                    amount: 0.07,
                },
            });
            gsap.to(menu, {
                duration: 1,
                css: { display: "none" },
            });
        } else if (
            state.clicked === true ||
            (state.clicked === true && state.initial === null)
        ) {
            gsap.to(menu, {
                duration: 0,
                css: { display: "block" },
            });
            gsap.to([revealMenu, revealMenuBackground], {
                duration: 0,
                opacity: 1,
                height: "100%",
            });
            staggerReveal(revealMenu, revealMenuBackground);
            staggerText(line1, line2, line3, line4);
            fadeInUp(info);
        }
    }, [state]);

    const staggerReveal = (node1, node2) => {
        gsap.from([node1, node2], {
            duration: 0.8,
            height: 0,
            transformOrigin: "right top",
            skewY: 2,
            ease: "power3.inOut",
            stagger: {
                amount: 0.1,
            },
        });
    };

    const staggerText = (node1, node2, node3, node4) => {
        gsap.from([node1, node2, node3, node4], {
            duration: 0.8,
            y: 100,
            delay: 0.2,
            ease: "power3.inOut",
            stagger: {
                amount: 0.5,
            },
        });
    };

    const fadeInUp = (node) => {
        gsap.from(node, {
            y: 60,
            duration: 1,
            delay: 0.2,
            opacity: 0,
            ease: "power3.inOut",
        });
    };

    const handleClick = () => {
        gsap.to([revealMenu, revealMenuBackground], {
            duration: 0.8,
            height: 0,
            ease: "power3.inOut",
            stagger: {
                amount: 0.07,
            },
        });
        gsap.to(menu, {
            duration: 1,
            css: { display: "none" },
        });
    };

    const handleSerie = (serie) => {
        gsap.to(cityBackground, {
            duration: 0,
            background: `url(${serie}) center center`,
        });

        gsap.to(cityBackground, {
            duration: 0.4,
            opacity: 1,
            ease: "power3.inOut",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
        });

        gsap.from(cityBackground, {
            duration: 0.4,
            skewY: 2,
            transformOrigin: "right top",
        });
    };

    const handleSerieReturn = () => {
        gsap.to(cityBackground, {
            duration: 0.4,
            opacity: 0,
        });
    };

    const handleOver = (e) => {
        gsap.to(e.target, {
            duration: 0.3,
            y: 3,
            skewX: 4,
            ease: "power3.inOut",
        });
    };

    const handleOverExit = (e) => {
        gsap.to(e.target, {
            duration: 0.3,
            y: -3,
            skewX: 0,
            ease: "power3.inOut",
        });
    };

    return (
        <div ref={(el) => (menu = el)} className="hamburger-menu">
            <div
                ref={(el) => (revealMenuBackground = el)}
                className="menu-secondary-background-color"
            ></div>
            <div ref={(el) => (revealMenu = el)} className="menu-layer">
                <div
                    ref={(el) => (cityBackground = el)}
                    className="menu-city-background"
                >
                </div>
                <div className="container">
                    <div className="wrapper">
                        <div className="menu-links">
                            <nav>
                                <ul>
                                    <li>
                                        <Link
                                            onMouseEnter={e => handleOver(e)}
                                            onMouseOut={e => handleOverExit(e)}
                                            ref={(el) => (line1 = el)}
                                            onClick={handleClick}
                                            to={"/seriedata"}
                                        >
                                            Series
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            onMouseEnter={e => handleOver(e)}
                                            onMouseOut={e => handleOverExit(e)}
                                            ref={(el) => (line2 = el)}
                                            onClick={handleClick}
                                            to={""}
                                        >
                                            En Proceso
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            onMouseEnter={e => handleOver(e)}
                                            onMouseOut={e => handleOverExit(e)}
                                            ref={(el) => (line3 = el)}
                                            onClick={handleClick}
                                            to={"/galeria"}
                                        >
                                            Galeria
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            onMouseEnter={e => handleOver(e)}
                                            onMouseOut={e => handleOverExit(e)}
                                            ref={(el) => (line4 = el)}
                                            onClick={handleClick}
                                            to={"/contacto"}
                                        >
                                            Contacto
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                            <div ref={(el) => (info = el)} className="info">
                                <h3>SeriesMania</h3>
                                <p>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                    Facilis ipsam provident excepturi sunt aliquid nisi maxime
                                    itaque, sit veniam voluptates repellat magni odit nostrum non
                                    reiciendis nulla expedita! Commodi, aliquam.
                                </p>
                            </div>
                            <div className="locations">
                                Series:
                                {seriesData.map((el) => (
                                    <span
                                        key={el.name}
                                        onMouseEnter={() => handleSerie(el.image)}
                                        onMouseOut={handleSerieReturn}
                                    >
                                        {el.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hamburger;
