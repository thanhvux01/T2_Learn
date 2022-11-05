import React,{useEffect, useState}from "react";
import styles from "./VocalNoImage.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const container = cx("container");
const title = cx("title");
const answerBox = cx("answer-box");
const indexBox = cx("index-box");
const answerText = cx("answer-text");
const VocalNoImage = (prop) => {
      const {word1,word2,word3,meaning} = prop.payload.content;
      return (
         <div className={container}>
           <div className={title}>Làm sao để nói "{meaning}" ?</div>
              <div className={answerBox}>
               <span onClick={()=>{
                  prop.GetData(word1);}}>
                <span className={indexBox}> 1 </span>
                <span className={answerText} > {word1} 
              </span>
               </span>
               <span onClick={()=>{
                  prop.GetData(word2);}}>
               <span className={indexBox}> 2 </span>
                <span className={answerText}> {word2} </span>
               </span>
               <span 
               onClick={()=>{
                  prop.GetData(word3);}}>
               <span className={indexBox}> 3 </span>
                <span className={answerText}> {word3} </span>
               </span>
              </div>
         </div>
      )
         
}
export default VocalNoImage;