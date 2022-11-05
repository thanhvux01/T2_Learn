import React from "react";
import styles from "./ExcerciseBox.module.scss";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { Flag , Star , final,AnimalPack} from "../../../assets";
const cx = classNames.bind(styles);
const excbox = cx("excercise-box")
const icon = cx("icon")
const star = cx("star");
const mainImg = cx("main-img")

export const ExcerciseBoxB1 = () => {
    const Navigate = useNavigate();
    return (
        <div className={excbox}>
        <span>< img className={icon} alt="flag"src={Flag} onClick={()=>{Navigate("/lesson",{state: {id:1}})}}/></span>
        <span>< img className={icon} alt="animal" src={AnimalPack.Deer} onClick={()=>{Navigate("/lesson",{state: {id:2}})}}/> </span>
        <span>< img className={icon} alt="animal" src={AnimalPack.Tree}/> </span>
        <img alt="star" className={star} src={Star}/>
        <span> </span>
        <span>< img className={icon}  alt="animal" src={AnimalPack.Tree}/> </span>
        <span>< img className={icon}  alt="animal" src={AnimalPack.Sheep}/> </span>
        <span>< img className={icon}  alt="animal"src={final}/> </span>
        <img alt="present" className={mainImg} src={AnimalPack.Farm}/> 
        </div>
    )
}
export default ExcerciseBoxB1;


