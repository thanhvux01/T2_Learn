import React, {useEffect,useState,useRef,createContext} from "react";
import {useLocation} from "react-router-dom"
import styles from "./Lesson.module.scss";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import {Col,Row,Container,Button} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import ProcessLarge from "../../components/ProcessLarge/ProcessLarge";
import Vocal3Image from "../../components/LessonBox/Vocal3Image/Vocal3Image";
import VocalNoImage from "../../components/LessonBox/VocalNoImage/VocalNoImage";
import ListeningBox from "../../components/LessonBox/Listening/ListeningBox";
import Alert from "../../components/Alert/Alert";
import CheckBar from "../../components/CheckBar/CheckBar";
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
    withCredentials: true,
  }
let LessonData;
let Words;
let Result;
// let Index  = 0;
const LessonContext = createContext();
const Lesson = () => {
    
    let Choice = useRef("NotSelect");
    const Index = useRef(0);
    const CheckBtn = useRef();
    const selectBar = useRef();
    const reward = useRef({
        "Correct":0,
        "Coin":0,
        "Exp":0,
        "Streak":0,
    })
    const [AlertShow,SetAlertShow] = useState(false);
    const nextBar = useRef();
    const {state} = useLocation();
    const navigate = useNavigate();
    const [VocalContent,SetVocalContent] = useState({content:{word1:"",word2:"",word3:"",result:"",meaning:""}});
    //const  [LessonData,SetLessonData] = useState({}); //!
    const [Correct,SetCorrect] = useState("");
    const [Content,SetContent] = useState({
        "vocalImage":false,
        "VocalNoimage":false,
        "pronoun":false,
    })
    // const [LessonType,SetLessonType] =useState({"vocalNoimage":"false","vocalImage":"false","listeningBox":"false"});
    const TypeContent = () => {
        // console.log(Index);
        switch(LessonData[Index.current].type){
            case "vocal":
                SetContent({
                    "vocalImage":true,
                    "VocalNoimage":false,
                    "pronoun":false
                })
                break;
            case "vocalNoimage":
                SetContent({
                    "vocalImage":false,
                    "vocalNoimage":true,
                    "pronoun":false
                })
                break;
            case "pronoun":
                SetContent({
                    "vocalImage":false,
                    "vocalNoimage":false,
                    "pronoun":true,
                })
                break;
         }
   
    }
    const GetChoice = (data) => {
         Choice = data;
         CheckBtn.current.style.backgroundColor = "#61E002";
         CheckBtn.current.style.color = "#FFFF";
    }
    const GetWords = async () => {
         const words =  await axios.post("/tuvung/find-words-lesson",{id:state.id+""},options)
         Words = words.data;
    }
    const Skip = () => {
          
        if(Index.current < LessonData.length-1){
         Index.current++;
         SetCorrect("");
         SetVocalContent(LessonData[Index.current]);
         Result = LessonData[Index.current].content.result;
         TypeContent();
        }
        else if(Index.current == LessonData.length-1){
           SetAlertShow(true);
        }
        selectBar.current.style.display = "flex";
    }
    const Compare = () => {
        if(Choice.current === "NotSelect"){    
        
        }
        else if(Choice === Result)  
        {  
           selectBar.current.style.display = "none";
           reward.current["Correct"] += 1;
           reward.current["Exp"] += 50;
           reward.current["Coin"] += 50;
           reward.current["Streak"] += 1;
           SetCorrect("true");
                   
        }
        else
        {   selectBar.current.style.display = "none";
           reward.current["streak"] = 0;
            SetCorrect("false");
        }
    }
    const GetLesson = async () => {
        try{
        const lesson = await axios.post("khoahoc/get-lesson",{id:state.id},options)
        if(lesson){
        LessonData = lesson.data[0].content;
        SetVocalContent(LessonData[Index.current]);
        Result = LessonData[Index.current].content.result;
        TypeContent();
        }
    }catch(err){

    }
       // if lesson.data[0].content = vocal
    }
    const SetupRevision = async () => {
         try{
            options.params = {number:state.number};
            
            const lesson = await axios.get("/khoahoc/revision",options);
             if(lesson){
             LessonData = lesson.data;
            SetVocalContent(LessonData[Index.current]);
            Result = LessonData[Index.current].content.result;
            TypeContent();
             }
         }catch(err){
             console.log(err);
         }
                
    }
    const Confirm = async () => {
        try{
        await axios.post("/auth/update-statis",{
            coin:reward.current["Coin"],
            exp:reward.current["Exp"],
            correct:reward.current["Correct"],
            total:LessonData.length-1,
        },options)
        await axios.post("/user/checkdaily",{total:reward.current["Correct"]},options)
        navigate("/learning");
        }catch(err){ 
            
        }            
    }
    useEffect(()=>{
    state.id && GetWords();
    state.id && GetLesson();
    !state.id && SetupRevision();
    },[])
    useEffect(()=>{
        CheckBtn.current.style.backgroundColor = "#E5E5E5";
        CheckBtn.current.style.color = "#CDCDCD";
    })
    return (
       
        <LessonContext.Provider value={{VocalContent,GetChoice}}>
        <Container fluid className={container}>
          
            <Row className={process}>
                <span className={exit}>
               <FontAwesomeIcon icon={faXmark} />
               </span>
               <ProcessLarge value={Index.current}/>
            </Row>
            <Row className={content}>
            
                { Content["vocalNoimage"] && <VocalNoImage payload={VocalContent} GetData={GetChoice}/> }
                              
                { Content["vocalImage"] && <Vocal3Image payload={VocalContent} GetData={GetChoice}/> }
                
                { Content["pronoun"] && <ListeningBox payload={VocalContent} GetData={GetChoice} words={Words}/> }

                { AlertShow && <Alert data={reward.current} total={LessonData.length-1}  story={"none"} confirm={Confirm}/> }

            </Row>
            <Row className={interact}>
                 <div className={selectAnswer} ref={selectBar}>
                  <Button className={[btn,left]} onClick={()=>{
                    navigate("/learning");
                  }}>BỎ QUA</Button>
                  <Button className={[btn,right,check]} onClick={Compare} ref={CheckBtn}>KIỂM TRA</Button>
                 </div>
                 <div ref={nextBar}>
                 <CheckBar isCorrect={Correct} goTonextQuestion={Skip} />
                 </div>
          </Row>
        </Container>
        </LessonContext.Provider>
    ) 
}
export {Lesson,LessonContext}   