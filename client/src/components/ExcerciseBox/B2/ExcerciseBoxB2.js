import React from "react";
import styles from "./ExcerciseBoxB2.module.scss";
import classNames from "classnames/bind";
import { Flag , Star , final,lifter,Can,Family} from "../../../assets";
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

export const ExcerciseBoxB2 = () => {
    return (
        <div className={excbox}>
        <span>< img className={flag} src={Flag}/></span>
        <span> </span>
        <span> </span>
        <img className={star} src={Star}/>
        <span> </span>
        <span> </span>
        <span> </span>
        <span>< img className={finalSVG} src={final}/> </span>
        
        </div>
    )
}
export default ExcerciseBoxB2;