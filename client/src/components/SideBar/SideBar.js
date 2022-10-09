import React from "react";
import styles from "./SideBar.module.scss"
import {Container,Row,Col} from "react-bootstrap"
import classNames from "classnames/bind";
import {Logo,IconLogo} from "../../assets"
import SideBarButton from "../SideBarButton/SideBarButton";
const cx= classNames.bind(styles);
const container = cx("container")
const logoBox= cx("logo-box")
const row = cx("row");
const col = cx("col");


const SideBar = () => {

    return(
    
       
        <div className={container}>
            <div className={logoBox}>
            <img src={IconLogo}></img>
            <SideBarButton/>
            </div>
           
      </div>

    )
        
    
}

export default SideBar