import React from "react";
import styles from "./ExcerciseBoxB2.module.scss";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { Flag , Star , final , FoodPack} from "../../../assets";
const cx = classNames.bind(styles);
const excbox = cx("excercise-box")
const icon = cx("icon")
const star = cx("star");
const mainImg = cx("main-img")

export const ExcerciseBoxB2 = () => {
    const Navigate = useNavigate();
    return (
        <div className={excbox}>
        <span>< img className={icon} alt="flag"src={Flag} onClick={()=>{Navigate("/lesson",{state: {id:4}})}}/></span>
        <span>< img className={icon} alt="food" src={FoodPack.Bread} /> </span>
        <span>< img className={icon} alt="food" src={FoodPack.Cupcake}/> </span>
        <img alt="star" className={star} src={Star}/>
        <span> </span>
        <span>< img className={icon} alt="food"  src={FoodPack.Candy}/> </span>
        <span>< img className={icon} alt="food" src={FoodPack.Chocolate}/> </span>
        <span>< img className={icon} alt="final" src={final}/> </span>
        <img alt="present" className={mainImg} src={FoodPack.HotDogCar}/> 
        </div>
    )
}
export default ExcerciseBoxB2;