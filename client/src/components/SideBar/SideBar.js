import React from "react";
import styles from "./SideBar.module.scss"
import classNames from "classnames/bind";
import {IconLogo} from "../../assets";
import SideBarButton from "../SideBarButton/SideBarButton";
import { faSwatchbook, faIdCard } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
const cx= classNames.bind(styles);
const container = cx("container")
const logoBox= cx("logo-box")
const value = {
    "learning":{
        "title":"Bài học",
        "faIcon":faSwatchbook,
    },
    "flashcard":{
        "title":"Flashcard",
        "faIcon": faIdCard, 
    }
}


const SideBar = (prop) => {
    const Navigate = useNavigate();
    const Navigator = (page) => {
        Navigate(page);
    }
    const {learning,flashcard} = prop.config;
    return(
    
       
        <div className={container}>
            <div className={logoBox}>
            <img src={IconLogo}></img>
            <SideBarButton value={value.learning} isChecked={learning} navigate={Navigator} page={"/learning"}/>
            <SideBarButton value={value.flashcard} isChecked={flashcard} navigate={Navigator} page={"/flashcard"}/>
            </div>
           
      </div>

    )
        
    
}

export default SideBar