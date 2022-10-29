import React, {useEffect,useState,useRef} from "react";
import {useLocation} from "react-router-dom"
import styles from "./Lesson.module.scss";
import classNames from "classnames/bind";
import {Col,Row,Container,Button} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmark,faCheck} from "@fortawesome/free-solid-svg-icons"
import Vocal3Image from "../../components/LessonBox/Vocal3Image/Vocal3Image";
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
const title = cx("title");
const btn = cx("btn");
const left = cx("left");
const right = cx("right");
const icon = cx("icon");
const isCorrect = cx("is-correct");
const leftBox = cx("left-box");
const options = {
    baseURL: "http://localhost:5000/api",
    method : 'POST',
    withCredentials: true,
  }
const Lesson = () => {
    let Choice = useRef();
    
    let Index  = 0;
    const NextBar = useRef();
    const CheckBtn = useRef();
    const iconRef = useRef();
    const wrongRef = useRef();
    const {state} = useLocation();
    const [VocalContent,SetVocalContent] = useState({content:{word1:"",word2:"",word3:"",result:"",meaning:""}}); //!
    const  [LessonData,SetLessonData] = useState({});
    const [Result,SetResult] = useState("");
    const GetChoice = (data) => {
         Choice = data;
         CheckBtn.current.style.backgroundColor = "#61E002";
         CheckBtn.current.style.color = "#FFFF";
    }
    const Compare = () => {
        
        if(Choice == Result)  
        {  
            NextBar.current.style.visibility = "visible";
            wrongRef.current.style.visibility = "none";
            console.log("correct");
            
        }
        else
        {
        NextBar.current.style.visibility = "visible";
        NextBar.current.style.backgroundColor = "#FFDFE0";
        console.log("incorrect");
        }

    }
    const GetLesson = async () => {
        const lesson = await axios.post("khoahoc/get-lesson",{id:state.id},options)
        console.log(lesson.data[0].content[0]);
        if(lesson.data[0].content[0].type == 'vocal');
        SetLessonData(lesson.data[0].content);
        SetVocalContent(lesson.data[0].content[Index]);
        SetResult(lesson.data[0].content[Index].content.result);
        
       // if lesson.data[0].content = vocal
    }
    useEffect(()=>{
    GetLesson();
    },[])
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
                <Vocal3Image payload={VocalContent} GetData={GetChoice}/>
            </Row>
            <Row className={interact}>
                 <div className={selectAnswer}>
                  <Button className={[btn,left]}>BỎ QUA</Button>
                  <Button className={[btn,right]} onClick={Compare} ref={CheckBtn}>KIỂM TRA</Button>
                 </div>
                 <div className={checkAnswer} ref={NextBar} >
                 
                 <span className={icon} useRef={iconRef}> 
                 <FontAwesomeIcon icon={faCheck} />
                 </span>
                
                 <Button className={[btn,right]} onClick={()=>{
                      SetVocalContent(LessonData[Index+1]);
                      NextBar.current.style.visibility = "hidden";
                 }}>TIẾP TỤC</Button>
                 </div>
                </Row>
        </Container>
        </>
    )
}

export default Lesson;