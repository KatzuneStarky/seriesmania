import React, {Children, useEffect, useState} from 'react'
import '../Styles/slider.scss'
import { AiOutlineSwapLeft, AiOutlineSwapRight } from 'react-icons/ai'

const Slider = (props) => {
    const [sliderPosition, setSliderPosition] = useState(0)
    const [touchStartPosition, setTouchStartPosition] = useState(0)
    const [touchEndPosition, setTouchEndPosition] = useState(0)
    const [touched, setTouched] = useState(false)
    const [swiped, setSwiped] = useState(false)

    const [mouseStartPosition, setMouseStartPosition] = useState(0)
    const [mouseEndPosition, setMouseEndPosition] = useState(0)
    const [mouseClicked, setMouseClicked] = useState(false)
    const [mouseSwiped, setMouseSwiped] = useState(false)

    const { children, infinite, timer, stopOnManual } = props

    const [autoAdvance, setAutoAdvance] = useState(timer !== undefined)

    let interval;
    const widthSpan = 100

    const prevSliderHandler = () => {
        let newPosition = sliderPosition
        if(newPosition > 0){
            newPosition = newPosition - 1
        }else if(infinite){
            newPosition = children.length - 1 || 0
        }

        translateFullSlides(newPosition)
        setSliderPosition(newPosition)
    }

    const nextSliderHandler = () => {
        let newPosition = sliderPosition
        if(newPosition < children.length - 1){
            newPosition = newPosition + 1
        }else if(infinite){
            newPosition = 0
        }

        translateFullSlides(newPosition)
        setSliderPosition(newPosition)
    }

    const translateFullSlides = (newPosition) => {
        let toTranslate = -widthSpan * newPosition
        for (var i = 0; i < (children.length || 1); i++) {
            let elem = document.getElementById(`carouselitem` + i)
            elem.style.transform = `translateX(` + toTranslate + `%)`
        }
    }

    const jumToSlideHandler = (id) => {
        let toTranslate = id
        translateFullSlides(toTranslate)
        setSliderPosition(id)
    }

    const manageTimer = () =>{
        clearInterval(interval)
        if(stopOnManual){
            setAutoAdvance(false)
        }
    }

    const prevClickHandler = () => {
        manageTimer()
        prevSliderHandler()
    }

    const nextClickHandler = () => {
        manageTimer()
        nextSliderHandler()
    }

    const keyPressHandler = (event) =>{
        manageTimer()
        if(event.key === "ArrowLeft"){
            event.preventDefault()
            event.stopPropagation()
            prevSliderHandler()
            return
        }

        if(event.key === "ArrowRight"){
            event.preventDefault()
            event.stopPropagation()
            nextSliderHandler()
            return
        }

        if(49 <= event.keyCode && event.keyCode <= 57){
            const arrayPos = event.keyCode - 49
            if(arrayPos < children.length){
                jumToSlideHandler(arrayPos)
            }
            return
        }
        
        if(event.keyCode === 48){
            if(children.length >= 10){
                jumToSlideHandler(9)
            }
        }
    }

    const speedAnimation = () => {
        for (var i = 0; i < children.length; i++) {
            let elem = document.getElementById(`carouselitem` + i)
            elem.classList.add("FastAnimation")
        }
    }

    const slowAnimation = () =>{
        for (var i = 0; i < children.length; i++) {
            let elem = document.getElementById(`carouselitem` + i)
            elem.classList.remove("FastAnimation")
        }
    } 

    const touchStartHandler = (e) => {
        manageTimer()
        speedAnimation()
        setTouchStartPosition(e.targetTouches[0].clientX)
        setTouchEndPosition(e.targetTouches[0].clientX)
        setTouched(true)
    }

    const touchMoveHandler = (e) => {
        setTouchEndPosition(e.targetTouches[0].clientX)
        const frameWidth = document.getElementById('DisplayFrame1').offsetWidth
        const translateDist = (touchEndPosition - touchStartPosition) / frameWidth * 100
        translatePartialSlides(translateDist)
        if(touched === true){
            setSwiped(true)
        }
    }

    const touchEndHandler = (e) => {
        if(swiped){
            slowAnimation()
            if(touchStartPosition - touchEndPosition > 75){
                nextSliderHandler()
            }else if(touchStartPosition - touchEndPosition < -75){
                prevSliderHandler()
            }else{
                jumToSlideHandler(sliderPosition)
            }
        }
        setTouched(false)
        setSwiped(false)
    }

    const mouseStartHandler = (e) => {
        manageTimer()
        e.preventDefault()
        speedAnimation()
        setMouseStartPosition(e.clientX)
        setMouseEndPosition(e.clientX)
        setMouseClicked(true)
    }

    const mouseMoveHandler = (e) =>{
        e.preventDefault()
        var frameWidth = document.getElementById('DisplayFrame1').offsetWidth
        if(mouseClicked === true){
            setMouseEndPosition(e.clientX)
            let translateDist = (mouseEndPosition - mouseStartPosition) / frameWidth * 100
            translatePartialSlides(translateDist)
            setMouseSwiped(true)
        }
    }

    const mouseEndHandler = (e) => {
        slowAnimation()
        if(mouseSwiped === true){
            if(touchStartPosition - touchEndPosition > 100){
                nextSliderHandler()
            }else if(touchStartPosition - touchEndPosition < -100){
                prevSliderHandler()
            }else{
                jumToSlideHandler(sliderPosition)
            }
        }
        setMouseSwiped(false)
        setMouseClicked(false)
    }

    const translatePartialSlides = (toTranslate) => {
        let currentTranslation = -sliderPosition * widthSpan
        let totalTranslation = currentTranslation + toTranslate
        for (var i = 0; i < (children.length || 1); i++) {
            let elem = document.getElementById(`carouselitem` + i)
            elem.style.transform = `translateX(` + totalTranslation + `%)`
        }
    }

    const displayItems = Children.map(children, (child, index) => (
        <div className="CarouselItem" id={`carouselitem` + index}>{child}</div>
    ))

    const positionIndicators = Children.map(children, (child, index) => (
        <div
            className={sliderPosition === index ? "positionIndicator".concat(' ' + "currentPosition")
            : "positionIndicator" }
            onClick={()  => jumToSlideHandler(index)} >

        </div>
    ))

    useEffect(() => {
        window.addEventListener('keydown', keyPressHandler)
        if(autoAdvance && !mouseClicked && !touched){
            interval = setInterval(() => {
                nextSliderHandler()
            }, timer)
        }
        return () => {
            window.removeEventListener('keydown', keyPressHandler)
            clearInterval(interval)
        }
    });

    return (
        <div className="SliderContainer">
            <div className="LeftArrow" onClick={prevClickHandler}>
                <AiOutlineSwapLeft color='white' size={50} className="arrowL" />
            </div>
            <div className="DisplayFrame"
                id='DisplayFrame1'
                onTouchStart={(e) => touchStartHandler(e)}
                onTouchMove={(e) => touchMoveHandler(e)}
                onTouchEnd={(e) => touchEndHandler(e)}
                onMouseDown={(e) => mouseStartHandler(e)}
                onMouseMove={(e) => mouseMoveHandler(e)}
                onMouseUp={(e) => mouseEndHandler(e)}
                onMouseLeave={(e) => mouseEndHandler(e)}
            >
                {displayItems}
            </div>
            <div className="RightArrow" onClick={nextClickHandler}>
                <AiOutlineSwapRight color='white' size={50} /> 
            </div>

            <div className="Navigation">
                {positionIndicators}
            </div>
        </div>
    )
}

export default Slider