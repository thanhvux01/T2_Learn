import React , {useEffect,useState} from "react";
import styles from "./CourseBox.module.scss";
import classNames from "classnames/bind";
import axios from "axios";
import {ExcerciseBox,ExcerciseBoxLv2} from "../ExcerciseBox/ExcerciseBox";
import { Flag , Star , final} from "../../assets";
const cx = classNames.bind(styles);
const container = cx("container");
const title = cx("title-box");
const excbox = cx("excercise-box")
const header = cx("header");
const desc = cx("description");
const flag = cx("flag");
const firstchld = cx("first-child");
const second = cx("second-child");
const third = cx("third-child");
const star = cx("star");
const fourth = cx("fourth-child");
const fifth = cx("fifth-child");
const sixth = cx("sixth-child");
const seventh = cx("seventh-child");
const finalSVG = cx("final");
const options = {
    baseURL: "http://localhost:5000/api",
    method : 'GET',
    withCredentials: true,
}
const CourseBox = (prop) => {
      let ThemeColor = "";
      const {name,description,image,courseID}= prop.courses;
      const ExcerciseShow = ["none","none","none","none","none"];
      const ExcerciseColor = ["#6DE1A7","#CE82FF","none","none","none"];
      if(courseID!=null){
        ExcerciseShow[courseID] = "initial";
        ThemeColor = ExcerciseColor[courseID];
      }
      const ExcArray = prop.courses.excercise;
      //console.log(ExcArray);
      useEffect(()=>{
      },[])
      return (
       <>
       <div className={container}>
          <div className={title} style={{"background-color":ThemeColor}}>
           <span className={header}>{name}</span>
           <span className={desc}>{description}</span>
          </div>
          <div style={{display:ExcerciseShow[0]}}>
         <ExcerciseBox/>
         </div>
         <div style={{display:ExcerciseShow[1]}}>
         <ExcerciseBoxLv2/>
         </div>
        </div>
       </>

      );

}

export default CourseBox;