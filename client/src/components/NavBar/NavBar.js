import React, { useState } from "react";
import {useRef,useEffect} from "react"
import {useNavigate} from "react-router-dom";
import styles from "./NavBar.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins,faBookTanakh } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import { Reading } from "../../assets";
import axios from "axios";
const cx = classNames.bind(styles);
const navBox = cx("nav-box");
const avatarFrame = cx("avatar-frame");
const space = cx("space");
const popup = cx("pop-up");
const name = cx("name");
const info = cx("info");
const estimate = cx("estimate");
const logout = cx("logout");
const level = cx("level");
const coin = cx("coin");  
const options = {baseURL: 'http://localhost:5000/api',withCredentials: true,};


const NavBar = (prop) => {
  const popupRef = useRef();
  const Navigate = useNavigate();
  const [Data,SetData] = useState();
  const GetData = async () => {
     try{
       const user = await axios.get("/auth/find",options) 
       SetData(user.data);            
     }catch{

     }
  }
  const Logout = async () => {
    try{
         await axios.get("/auth/logout",options)
         Navigate("/");
    }catch(err){
        console.log(err);
    }
  }
  const showPopup = (a) => {
    if(a==1)
    // console.log(prop.username)
    popupRef.current.style.display = "flex";
    if(a==0)
    popupRef.current.style.display = "none";
  }
   useEffect(()=>{
  
    popupRef.current.style.display = "none";
    GetData();
   },[])
 
     return (
         <div className={navBox}>
          <div className={space}></div>
          {Data &&
          <>
           <div className={coin}>
            <FontAwesomeIcon icon={faCoins}/>
            {Data.coin}</div>
           
            <div className={level}>
            <FontAwesomeIcon icon={faBookTanakh}/>
            {Data.exp}</div> 
            </>
            }      
           <div className={avatarFrame} onMouseOver={()=>{showPopup(1)}} onMouseLeave={()=>{showPopup(0)}}>
             { Data && <img alt="avatar" src={Data.image}></img> }
             <div className={popup} ref={popupRef}>
             <span className={name}><img src={Reading}/> </span>
             <span className={info} onClick={()=>{Navigate("/profile")}}>Thông tin cá nhân</span>
             <span className={estimate}>Thống kê</span>
             <span className={logout} onClick={Logout}>Đăng xuất</span>
             </div>
           </div>
         </div>
     )

}
export default NavBar;