import React, {useEffect,useState,useRef} from "react";
import {useLocation} from "react-router-dom"
import styles from "./Lesson.module.scss";
import classNames from "classnames/bind";
import {Col,Row,Container,Button} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmark} from "@fortawesome/free-solid-svg-icons"
import CorrectBox from "../../components/CorrectBox/CorrectBox";
import Vocal3Image from "../../components/LessonBox/Vocal3Image/Vocal3Image";
import VocalNoImage from "../../components/LessonBox/VocalNoImage/VocalNoImage";
import InCorrectBox from "../../components/InCorrectBox/InCorrectBox";
import axios from "axios";
const cx = classNames.bind(styles);
const container = cx("container");
const processBar = cx("process-bar")
const content = cx("content");
const interact = cx("interact-footer");
const selectAnswer = cx("select-answer");
const checkAnswer = cx("check-answer");
const exit = cx("exit");
const process = cx("process");
const btn = cx("btn");
const left = cx("left");
const right = cx("right");
const next = cx("next");
const check = cx("check");
const options = {
    baseURL: "http://localhost:5000/api",
    method : 'POST',
    withCredentials: true,
  }
let LessonData;
let Index  = 0;
const Lesson = () => {
    let Choice = useRef("NotSelect");
    const NextBar = useRef();
    const CheckBtn = useRef();
    const NextBtn = useRef();
    const Correct = useRef();
    const InCorrect = useRef();
    const {state} = useLocation();
    const [VocalContent,SetVocalContent] = useState({content:{word1:"",word2:"",word3:"",result:"",meaning:""}});
    //const  [LessonData,SetLessonData] = useState({}); //!
    const [Result,SetResult] = useState("");
    let result = "";
    const GetChoice = (data) => {
         Choice = data;
         CheckBtn.current.style.backgroundColor = "#61E002";
         CheckBtn.current.style.color = "#FFFF";
    }
    const Compare = () => {
        if(Choice.current === "NotSelect"){
            
        }
        else if(Choice === Result)  
        {   console.log(Choice);
            NextBar.current.style.visibility = "visible";
            NextBar.current.style.backgroundColor = "#D7FFB8";
            Correct.current.style.display = "initial";
            InCorrect.current.style.display = "none";
            console.log("correct");
            
        }
        else
        {
        console.log(Choice);
        NextBar.current.style.visibility = "visible";
        NextBar.current.style.backgroundColor = "#FFDFE0";
        NextBtn.current.style.backgroundColor = "#FF5252"
        Correct.current.style.display = "none";
        InCorrect.current.style.display = "initial";    
        console.log("incorrect");
        }

    }
    const GetLesson = async () => {
        const lesson = await axios.post("khoahoc/get-lesson",{id:state.id},options)
        if(lesson)
        LessonData = lesson.data[0].content;
        if(LessonData[Index].type === 'vocal'){
        SetVocalContent(LessonData[Index]);
        SetResult(LessonData[Index].content.result);
        }
        
       // if lesson.data[0].content = vocal
    }
    useEffect(()=>{
    GetLesson();
    },[])
    useEffect(()=>{
        CheckBtn.current.style.backgroundColor = "#E5E5E5";
        CheckBtn.current.style.color = "#CDCDCD";

    })
    return (
       
        <>
        <Container fluid className={container}>
            <Row className={process}>
                <span className={exit}>
               <FontAwesomeIcon icon={faXmark} />
               </span>
               <span className={processBar}>
                      
               </span>
            </Row>
            <Row className={content}>
                {/* <VocalNoImage payload={VocalContent} GetData={GetChoice}/>  */}
                 <Vocal3Image payload={VocalContent} GetData={GetChoice}/> 
            </Row>
            <Row className={interact}>
                 <div className={selectAnswer}>
                  <Button className={[btn,left]}>BỎ QUA</Button>
                  <Button className={[btn,right,check]} onClick={Compare} ref={CheckBtn}>KIỂM TRA</Button>
                 </div>
                 <div className={checkAnswer} ref={NextBar} >
                 <div ref={Correct} style={{display:"none"}}>
                 <CorrectBox/>
                 </div>
                 <div ref={InCorrect} style={{display:"none"}}>
                 <InCorrectBox result={Result}/>
                 </div>
                 <Button className={[btn,right,next]} ref={NextBtn} onClick={()=>{
                      Index++;
                      if(Index  < LessonData.length){
                      SetVocalContent(LessonData[Index]);
                      SetResult(LessonData[Index].content.result);
                      }
                      NextBar.current.style.visibility = "hidden";
                 }}>TIẾP TỤC</Button>
                 </div>
                </Row>
        </Container>
        </>
    )
}

export default Lesson;