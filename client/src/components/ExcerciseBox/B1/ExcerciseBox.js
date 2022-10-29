import React from "react";
import styles from "./ExcerciseBox.module.scss";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { Flag , Star , final,lifter,Can,Family,AnimalPack} from "../../../assets";
const cx = classNames.bind(styles);
const excbox = cx("excercise-box")
const icon = cx("icon")
const star = cx("star");


export const ExcerciseBoxB1 = () => {
    const Navigate = useNavigate();
    return (
        <div className={excbox}>
        <span>< img className={icon} src={Flag} onClick={()=>{Navigate("/lesson",{state: {id:1}})}}/></span>
        <span>< img className={icon} src={AnimalPack.Deer}/> </span>
        <span>< img className={icon} src={AnimalPack.Tree}/> </span>
        <img className={star} src={Star}/>
        <span> </span>
        <span>< img className={icon} src={AnimalPack.Tree}/> </span>
        <span>< img className={icon} src={AnimalPack.Sheep}/> </span>
        <span>< img className={icon} src={final}/> </span>
        </div>
    )
}
export default ExcerciseBoxB1;


