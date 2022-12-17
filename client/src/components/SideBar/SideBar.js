import React from "react";
import styles from "./SideBar.module.scss"
import classNames from "classnames/bind";
import {IconLogo} from "../../assets";
import SideBarButton from "../SideBarButton/SideBarButton";
import { faSwatchbook, faIdCard,faMagnifyingGlass ,faBook, faSheetPlastic} from "@fortawesome/free-solid-svg-icons";
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
},
"search":{
    "title":"Tra từ điển",
    "faIcon":faMagnifyingGlass,
},
"story":{
    "title":"Đọc truyện",
    "faIcon":faBook,
},
"statis":{
    "title":"Thống kê",
    "faIcon":faSheetPlastic,
}

}


const SideBar = (prop) => {
    const Navigate = useNavigate();
    const Navigator = (page) => {
        Navigate(page);
    }
    const {learning,flashcard,search,story,statis} = prop.config;
    return(
    
       
        <div className={container}>
            <div className={logoBox}>
            <img src={IconLogo} onClick={()=>{Navigate("/learning")}}  ></img>
            <SideBarButton value={value.learning} isChecked={learning} navigate={Navigator} page={"/learning"}/>
            <SideBarButton value={value.flashcard} isChecked={flashcard} navigate={Navigator} page={"/flashcard"}/>
            <SideBarButton value={value.search} isChecked={search} navigate={Navigator} page={"/search"}/>
            <SideBarButton value={value.story} isChecked={story} navigate={Navigator} page={"/story"}/>
            <SideBarButton value={value.statis} isChecked={statis} navigate={Navigator} page={"/statis"}/>
            </div>
      </div>

    )
        
    
}

export default SideBar