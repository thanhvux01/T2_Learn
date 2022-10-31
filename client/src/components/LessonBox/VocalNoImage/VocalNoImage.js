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
      return (
         <div className={container}>
           <div className={title}>Làm sao để nói "Mèo" ?</div>
              <div className={answerBox}>
               <span>
                <span className={indexBox}> 1 </span>
                <span className={answerText}> Cat </span>
               </span>
               <span>
                1
               </span>
               <span>
                1
               </span>
              </div>
         </div>
      )
         
}
export default VocalNoImage;