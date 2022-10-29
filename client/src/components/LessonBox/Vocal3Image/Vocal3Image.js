import React,{useEffect, useState}from "react";
import styles from "./Vocal3Image.module.scss";
import classNames from "classnames/bind";
import {Unit1} from "../../../assets/courses";
var path = require('path');
const cx = classNames.bind(styles);
const imageBox = cx("image-box");
const container = cx("container");
const number = cx("number");
const title = cx("title");
const line = cx("break");
const Animal = Unit1.Animal;
const data = "Cat";
/*const word1 = "Cat";
const word2 = "Cat";
const word3 = "Cat";
const result = "Cat";*/
function Vocal3Image(prop) {
    const {word1,word2,word3,result,meaning} = prop.payload.content;
    const [BGC,SetBGC] = useState({"box1":"#FFFF","box2":"#FFFF","box3":"#FFFF"});

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
    return (
        <div className={container}>
            <div className={title}>Đâu là "{meaning}" ?</div>
            <div className={line}></div>
            <div className={imageBox}>
                <span onClick={()=>{
                     prop.GetData(word1);
                     ChangeColor("box1");
                }} style={{backgroundColor:BGC.box1}}>
                    <img src={Animal[word1]}/>
                    <span className={title}>{word1}</span>
                    <span className={number}>1</span>
                </span>
                <span onClick={()=>{
                     prop.GetData(word2);
                     ChangeColor("box2");
                }}  style={{backgroundColor:BGC.box2}}>
                <img src={Animal[word2]}/>
                    <span className={title}>{word2}</span>
                    <span className={number}>2</span>
                </span>
                <span onClick={()=>{
                     prop.GetData(word3);
                     ChangeColor("box3");

                }} style={{backgroundColor:BGC.box3}}>
                <img src={Animal[word3]}/>
                    <span className={title}>{word3}</span>
                    <span className={number}>3</span>
                </span>
            </div>
        </div>
    );
}

export default Vocal3Image;