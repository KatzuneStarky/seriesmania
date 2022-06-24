import gsap from 'gsap'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Hamburger from './Hamburger'
import '../../Styles/Header.scss'

const Header = () => {
    const history = useNavigate()
    const [state, setState] = useState({
        initial: false,
        clicked: null,
        menuName: "Menu"
    })

    const [disabled, setDisabled] = useState(false)

    const handleMenu = () => {
        disableMenu()
        if(state.initial === false){
            setState({
                initial: null,
                clicked: true,
                menuName: 'Cerrar'
            })
        }else if(state.clicked === true){
            setState({
                clicked: !state.clicked,
                menuName: 'Menu'
            })
        }else if(state.clicked === false){
            setState({
                clicked: !state.clicked,
                menuName: 'Cerrar'
            })
        }
    }
    
    const disableMenu = () => {
        setDisabled(!disabled)
        setTimeout(() => {
            setDisabled(false)
        }, 1200)
    }

    return (
        <header>
            <div className='container'>
                <div className="wrapper">
                    <div className="inner-header">
                        <div className="logo">
                            <Link to={"/"}>SeriesMania</Link>
                        </div>
                        <div className="menu">
                            <button disabled={disabled} onClick={handleMenu}>Menu</button>
                        </div>
                    </div>
                </div>
            </div>
            <Hamburger state={state} />
        </header>
    )
}

export default Header