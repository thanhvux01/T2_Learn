import React from "react";
import {useRef} from "react";
import {Container,Row,Col} from "react-bootstrap"
import styles from "./SideBarButton.module.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSwatchbook} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
const cx = classNames.bind(styles)
const icon = cx("icon")
const text = cx("text")
const checkBar = cx("check-bar")
const iconBox = cx("icon-box")
const container = cx("container")
const subcontainer = cx("sub-container")
const SideBarButton = () => {
    const btnBox = useRef();
    const  SetColor = () => {
        btnBox.current.style.backgroundColor = "#F6F6F6";
        
    }

    return (
        <>
        <div className={container} ref={btnBox} onClick={SetColor}>
            <div className={iconBox}>
                <FontAwesomeIcon icon={faSwatchbook} className={icon}/>
            </div>
            <div className={text}>
                <h3>BÀI HỌC</h3>
            </div>
          
            <div className={checkBar}></div>
           
        </div>
        
        </>
        
         
    )
}

export default SideBarButton