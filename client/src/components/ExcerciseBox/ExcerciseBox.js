import React from "react";
import styles from "./ExcerciseBox.module.scss";
import classNames from "classnames/bind";
import { Flag , Star , final,lifter,Can,Family} from "../../assets";
const cx = classNames.bind(styles);
const firstchld = cx("first-child");
const excbox = cx("excercise-box")
const flag = cx("flag");
const seventh = cx("seventh-child");
const finalSVG = cx("final");
const second = cx("second-child");
const third = cx("third-child");
const star = cx("star");
const fourth = cx("fourth-child");
const fifth = cx("fifth-child");
const sixth = cx("sixth-child");
const icon = cx("icon");

export const ExcerciseBox = () => {
    return (
        <div className={excbox}>
        <span className={firstchld}>< img className={flag} src={Flag}/></span>
        <span className={second}> </span>
        <span className={third}> </span>
        <img className={star} src={Star}/>
        <span className={fourth}> </span>
        <span className={fifth}> </span>
        <span className={sixth}> </span>
        <span className={seventh}>< img className={finalSVG} src={final}/> </span>
        <img src={Can}/>
        </div>
    )
}
export const ExcerciseBoxLv2 = () => {
    return (
        <div className={excbox}>
        <span style={{backgroundColor:"#CE82FF"}} className={firstchld}>< img className={flag} src={Flag}/></span>
        <span style={{backgroundColor:"#CE82FF"}} className={second}> < img className={icon} src={lifter}/></span>
        <span style={{backgroundColor:"#CE82FF"}} className={third}> </span>
        <img className={star} src={Star}/>
        <span style={{backgroundColor:"#CE82FF"}} className={fourth}> </span>
        <span style={{backgroundColor:"#CE82FF"}} className={fifth}> </span>
        <span style={{backgroundColor:"#CE82FF"}} className={sixth}> </span>
        <span style={{backgroundColor:"#CE82FF"}} className={seventh}>< img className={finalSVG} src={final}/> </span>
        <img style={{width:"100px",height:"150px"}}src={Family}/>
        </div>
    )
}


