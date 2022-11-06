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
const SideBarButton = (prop) => {
    const btnBox = useRef();
    const {title,faIcon} = prop.value;
    const isChecked = prop.isChecked;
    const navigate = prop.navigate;
    const page = prop.page;
    let color,bgi;
    isChecked ? color="rgba(0, 147, 233,0.5)" : color="#FFFF";
    isChecked ? bgi=" linear-gradient(160deg, rgba(0, 147, 233,0.1) 0%, rgb(128, 208, 199) 100%" : color="#FFFF";

    return (
        
        <div className={container} ref={btnBox} style={{backgroundColor:color,backgroundImage:bgi}} onClick={()=>{
              navigate(page);
        }}>
            <div className={iconBox}>
                <FontAwesomeIcon icon={faIcon} className={icon}/>
            </div>
            <div className={text}>
                <h3>{title}</h3>
            </div>
            {/* <div className={checkBar}></div> */}
            
        </div>
        
        
         
    )
}

export default SideBarButton