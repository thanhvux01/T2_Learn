import React , {useEffect,useState} from "react";
import styles from "./CourseBox.module.scss";
import classNames from "classnames/bind";
import axios from "axios";
import ExcerciseBoxB1 from "../ExcerciseBox/B1/ExcerciseBox"
import ExcerciseBoxB2 from "../ExcerciseBox/B2/ExcerciseBoxB2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);
const container = cx("container");
const title = cx("title-box");
const header = cx("header");
const desc = cx("description");
const guideBox = cx("guide-box");
const divLeft = cx("div-left");
const guideBoxtitle = cx("guide-box-title");
const options = {
    baseURL: "http://localhost:5000/api",
    method : 'GET',
    withCredentials: true,
}
const CourseBox = (prop) => {
      let ThemeColor = "";
      let HelpColor = "";
      const {name,description,image,courseID}= prop.courses;
      const ExcerciseShow = ["none","none","none","none","none"];
      const ExcerciseColor = ["#6DE1A7","#FDB750","none","none","none"];
      const HelpBoxColor = ["#21A362","#FFFF"];
      if(courseID!=null){
        ExcerciseShow[courseID] = "initial";
        ThemeColor = ExcerciseColor[courseID];
        HelpColor = HelpBoxColor[courseID];
      }
      const ExcArray = prop.courses.excercise;
      //console.log(ExcArray);
      useEffect(()=>{
      },[])
      return (
       <>
       <div className={container}>
          <div className={title} style={{backgroundColor:ThemeColor}}>
            <div className={divLeft}>
           <span className={header}>{name}</span>
           <span className={desc}>{description}</span>
           </div>
           <div className={guideBox} style={{borderColor:HelpColor}}>
            <FontAwesomeIcon icon={faBook}/>
           <span className={guideBoxtitle}> Hướng dẫn</span>
           </div>
          </div>
          <div style={{display:ExcerciseShow[0]}}>
         <ExcerciseBoxB1/>
         </div>
         <div style={{display:ExcerciseShow[1]}}>
         <ExcerciseBoxB2/>
         </div>
        </div>
       </>

      );

}

export default CourseBox;