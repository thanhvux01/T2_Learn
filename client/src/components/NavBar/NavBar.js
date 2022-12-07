import React from "react";
import {useRef,useEffect} from "react"
import {useNavigate} from "react-router-dom";
import styles from "./NavBar.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins,faBookTanakh } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import {Cow_Avatar} from "../../assets";
import { Reading } from "../../assets";
const cx = classNames.bind(styles);
const navBox = cx("nav-box");
const avatarFrame = cx("avatar-frame");
const Feature = cx("feature");
const space = cx("space");
const popup = cx("pop-up");
const name = cx("name");
const info = cx("info");
const estimate = cx("estimate");
const logout = cx("logout");
const level = cx("level");
const coin = cx("coin");  


const NavBar = (prop) => {
  const popupRef = useRef();
  const Navigate = useNavigate();
  const showPopup = (a) => {
    if(a==1)
    // console.log(prop.username)
    popupRef.current.style.display = "flex";
    if(a==0)
    popupRef.current.style.display = "none";
  }
   useEffect(()=>{
  
    popupRef.current.style.display = "none";
 
   },[])
 
     return (
         <div className={navBox}>
          <div className={space}></div>
           <div className={coin}>
            <FontAwesomeIcon icon={faCoins}/>
            {prop.coin}</div>
            <div className={level}>
            <FontAwesomeIcon icon={faBookTanakh}/>
            {prop.exp}</div>       
           <div className={avatarFrame} onMouseOver={()=>{showPopup(1)}} onMouseLeave={()=>{showPopup(0)}}>
             <img src={Cow_Avatar} alt="avatar"></img>
             <div className={popup} ref={popupRef}>
             <span className={name}><img src={Reading}/> </span>
             <span className={info} onClick={()=>{Navigate("/profile")}}>Thông tin cá nhân</span>
             <span className={estimate}>Thống kê</span>
             <span className={logout}>Đăng xuất</span>
             </div>
           </div>
         </div>
     )

}
export default NavBar;