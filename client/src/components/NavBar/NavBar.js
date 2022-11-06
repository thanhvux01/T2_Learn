import React from "react";
import {useRef,useEffect} from "react"
import styles from "./NavBar.module.scss"
import { Container,Row,Col } from "react-bootstrap";
import classNames from "classnames/bind";
import {Cow_Avatar} from "../../assets";
const cx = classNames.bind(styles);
const navBox = cx("nav-box");
const avatarFrame = cx("avatar-frame");
const Feature = cx("feature");
const space = cx("space");
const popup = cx("pop-up");
const info = cx("info");
const mail = cx("mail");




const NavBar = (prop) => {
  const popupRef = useRef();
  
 
  const showPopup = (a) => {
    if(a==1)
    // console.log(prop.username)
    popupRef.current.style.display = "initial";
    if(a==0)
    popupRef.current.style.display = "none";
  }
   useEffect(()=>{
  
    popupRef.current.style.display = "none";
 
   },[])
 
     return (
         <div className={navBox}>
          <div className={space}></div>
           <div className={Feature}><h3>Help</h3></div>
           <div className={avatarFrame} onMouseOver={()=>{showPopup(1)}} onMouseLeave={()=>{showPopup(0)}}>
             <img src={Cow_Avatar} alt="avatar"></img>
             <div className={popup} ref={popupRef}>
                 <span className={info}>User: {prop.username}</span>
                 <span className={mail}>Email: {prop.email}</span>
             </div>
           </div>
         </div>
     )

}
export default NavBar;