import React , {useEffect,useState} from "react";
import styles from "./CourseBox.module.scss";
import classNames from "classnames/bind";
import axios from "axios";
import ExcerciseBoxB1 from "../ExcerciseBox/B1/ExcerciseBox"
import ExcerciseBoxB2 from "../ExcerciseBox/B2/ExcerciseBoxB2";
import { Flag , Star , final} from "../../assets";
const cx = classNames.bind(styles);
const container = cx("container");
const title = cx("title-box");
const header = cx("header");
const desc = cx("description");
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
          <div className={title} style={{backgroundColor:ThemeColor}}>
           <span className={header}>{name}</span>
           <span className={desc}>{description}</span>
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