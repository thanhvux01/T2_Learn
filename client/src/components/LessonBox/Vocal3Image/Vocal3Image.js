import React,{useEffect, useRef, useState}from "react";
import styles from "./Vocal3Image.module.scss";
import classNames from "classnames/bind";
import {CourseImage} from "../../../assets/courses";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faFullheart } from "@fortawesome/free-solid-svg-icons";
import { Demo,Back } from "../../../assets";
import {faHeart } from "@fortawesome/free-regular-svg-icons"
import axios from "axios";
const cx = classNames.bind(styles);
const imageBox = cx("image-box");
const container = cx("container");
const number = cx("number");
const title = cx("title");
const line = cx("break");
const icon = cx("icon");
const guideBox = cx("guide-box");
const guideTitle = cx("guide-title");
const front = cx("front");
const back = cx("back");
const flashcard = cx("flashcard")
const frontTitle = cx("front-title");
const info = cx("info");
const frontImage = cx("front-image")
const options = {baseURL: 'http://localhost:5000/api',method : 'POST',withCredentials: true,};
/*const word1 = "Cat";
const word2 = "Cat";
const word3 = "Cat";
const result = "Cat";*/
function Vocal3Image(prop) {
    const guideRef = useRef();
    const {word1,word2,word3,result,meaning} = prop.payload.content;
    const [BGC,SetBGC] = useState({"box1":"#FFFF","box2":"#FFFF","box3":"#FFFF"});
    const [Icon,SetIcon] = useState(faHeart);
    const iconRef = useRef();
    const ChangeColor = (selected) =>{
       if(selected=="box1"){
        SetBGC({"box1":"#BBF2FF","box2":"#FFFF","box3":"#FFFF"})
       }
       if(selected=="box2"){
       SetBGC({"box1":"#FFFF","box2":"#BBF2FF","box3":"#FFFF"})
    }
    if(selected=="box3"){
        SetBGC({"box1":"#FFFF","box2":"#FFFF","box3":"#BBF2FF"})
    }
  }
  const QuickFlashCard = () => {
     guideRef.current.style.display="flex";
}
 const DisableFlashCard = () => {
    guideRef.current.style.display="none";
 }
 const CheckFlashCard = async () => {
   const check = await axios.post("/tuvung/check-flashcard",{word:result},options);
   if(check.data=="Unavailable"){
     SetIcon(faFullheart);
     iconRef.current.style.color = "red";
   }
   else{
    SetIcon(faHeart);
    iconRef.current.style.color = "black";
   }
 }
 const AddFlashCard = () => {
   Icon==faHeart &&  SetIcon(faFullheart);
   Icon==faFullheart &&  SetIcon(faHeart);
   axios.post("/tuvung/create-flashcard",{word:result},options)
 }
 useEffect(()=>{
  CheckFlashCard();
 },[result])

    return (
        <div className={container}>
            <div className={title}>Đâu là "{meaning}" ?
            <span className={icon} ref={iconRef}><FontAwesomeIcon icon={Icon} color={"red"} onMouseOver={QuickFlashCard} onMouseLeave={DisableFlashCard} onClick={AddFlashCard}/></span>
            <span className={guideBox} ref={guideRef}>
                <span className={guideTitle}>Tạo Thẻ Nhanh</span>
                <span className={flashcard}>
                <span className={front}>
                    <span className={frontTitle}>{result}</span>
                    <span className={frontImage}><img src={CourseImage[result]}/></span>
                </span>
                <span className={back}>
                    <span>{meaning}</span>
                </span>
                </span>
            </span>
            </div>
            <div className={line}></div>
            <div className={imageBox}>
                <span onClick={()=>{
                     prop.GetData(word1);
                     ChangeColor("box1");
                }} style={{backgroundColor:BGC.box1}}>
                    <img src={CourseImage[word1]}/>
                    <span className={title}>{word1}</span>
                    <span className={number}>1</span>
                </span>
                <span onClick={()=>{
                     prop.GetData(word2);
                     ChangeColor("box2");
                }}  style={{backgroundColor:BGC.box2}} >
                <img src={CourseImage[word2]}/>
                    <span className={title}>{word2}</span>
                    <span className={number}>2</span>
                </span>
                <span onClick={()=>{
                     prop.GetData(word3);
                     ChangeColor("box3");

                }} style={{backgroundColor:BGC.box3}}>
                <img src={CourseImage[word3]}/>
                    <span className={title}>{word3}</span>
                    <span className={number}>3</span>
                </span>
            </div>
        </div>
    );
}

export default Vocal3Image;