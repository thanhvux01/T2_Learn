
import React, {useEffect,useState,useRef,useContext} from "react";
import styles from "./CheckBar.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LessonContext } from "../../pages/Lesson";
import {Button} from "react-bootstrap";
import CorrectBox from "../CorrectBox/CorrectBox";
import InCorrectBox from "../InCorrectBox/InCorrectBox";
const cx = classNames.bind(styles);
const checkAnswer = cx("check-answer");
const btn = cx("btn");
const right = cx("right");
const next = cx("next");
const  CheckBar = (prop) => {
    const {isCorrect} = prop;
    const NextBar = useRef();
    const NextBtn = useRef();
    const Correct = useRef();
    const InCorrect = useRef();
    useEffect(()=>{
      if(isCorrect===""){

      }
      else if(isCorrect==="true"){
        
        NextBar.current.style.display = "flex";
        NextBar.current.style.backgroundColor = "#D7FFB8";
        NextBtn.current.style.backgroundColor = "#58a700"
        Correct.current.style.display = "initial";
        InCorrect.current.style.display = "none";
      }
      else{
        NextBar.current.style.display = "flex";
        NextBar.current.style.backgroundColor = "#FFDFE0";
        NextBtn.current.style.backgroundColor = "#FF5252"
        Correct.current.style.display = "none";
        InCorrect.current.style.display = "initial";    
  
      }
    })
  return (
    <div className={checkAnswer} ref={NextBar} >
    <div ref={Correct}>
    <CorrectBox/>
    </div>
    <div ref={InCorrect}>
    <InCorrectBox result={"Unset"}/>
    </div>
    <Button className={[btn,right,next]} ref={NextBtn} onClick={()=>{
      prop.goTonextQuestion();
      NextBar.current.style.display = "none";
    }} 
      
     >TIẾP TỤC</Button>
    </div>
  )

}
export default CheckBar;