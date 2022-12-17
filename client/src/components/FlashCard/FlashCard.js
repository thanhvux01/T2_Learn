import React , {useEffect, useRef, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh,faGear} from '@fortawesome/free-solid-svg-icons';
import styles from './FlashCard.module.scss'
import { CourseImage } from '../../assets/courses';
import classNames from 'classnames/bind'; 
import axios from 'axios';
const cx = classNames.bind(styles);
const title = cx("title");
const flashCard = cx("flash-card");
const pronoun = cx("pronoun");
const frontContent = cx("front-content");
const backContent = cx("back-content");
const config = cx("config");
const panel = cx("panel");
const deleteBtn = cx("delete-btn");
const txtNote = cx("note");
const changeBtn = cx("change-btn");
const selectSpan = cx("select-span");
const options = {baseURL: 'http://localhost:5000/api',method : 'POST',withCredentials: true,};
 const FlashCard = (prop) => {
    const coin = useRef(true);
    const displayPanel = useRef(false);
    const defaultColor = "linear-gradient(160deg, rgb(0, 147, 233) 0%, rgb(128, 208, 199) 100%)";
    const cardRef = useRef();
    const panelRef = useRef();
    const audioBoxref = useRef();
    const deleteIndex = useRef(0);
    const [AudioSrc,SetAudioSrc] = useState("");
    let {reload,color=defaultColor} = prop;
    const {word,meaning,phonetic,partofspeech,img,type,note} = prop.data;
    const OwnColor = prop.data.color; 
    if(OwnColor){
      color = OwnColor;
    }
    const Turn180 = (e) => {
     e.stopPropagation();
    coin.current ? cardRef.current.style.transform = "rotateY(180deg)": cardRef.current.style.transform = "rotateY(0deg)";
    coin.current = !coin.current;
    }
    const ShowConfig = (e) => {
      e.stopPropagation();
      displayPanel.current ? panelRef.current.style.display = "initial" : panelRef.current.style.display = "none"
      displayPanel.current =  !displayPanel.current;
    }
    const GetAudio = async () =>{
      //  console.log(content.result);
      try{
       const src = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
       src && SetAudioSrc(src.data[0].phonetics[0].audio); 
      }
      catch(err){

      }
    }
    const Speak = (e) => {
    e.stopPropagation();
    audioBoxref.current.play();
    };
  const DeleteCard = async (e) => {
    e.stopPropagation();
    try{
      const removePromise = await axios.post(`/tuvung/delete-card`,{word:word},options);
      reload();
    }
    catch(err){
     console.log(err);
    }
  }
 const ShowEdit = () => {
     prop.CardToEdit(word);

 }

  useEffect(()=>{
    GetAudio();
    audioBoxref.current.load();
  })
  useEffect(()=>{
    audioBoxref.current.controls = false;
  },[])
  return (
    <span  className={flashCard} ref={cardRef} onClick={Turn180} style={{backgroundImage:color}}>
    <span className={frontContent}>
       <span className={title}>{meaning}</span>
      { type=="bySearch" && <img src={img}></img> }
      { type=="byCourse" && <img src={CourseImage[word]}></img> }

    </span>
    <span className={backContent} >
      <span className={config} onClick={ShowConfig} ><FontAwesomeIcon icon={faGear}/>
      </span>
       <span className={title}>{word}</span>
       <span className={pronoun} onClick={Speak}>{phonetic} <FontAwesomeIcon icon={faVolumeHigh}/></span>
      {note  && <span className={txtNote}>"{note}"</span> }
       <span className={panel} ref={panelRef}>
         <span className={selectSpan}>
         <span className={deleteBtn} onClick={DeleteCard}>Xóa</span>
         <span className={changeBtn} onClick={ShowEdit}> Sửa</span>
         </span>
           </span>    
    </span>
    <audio controls ref={audioBoxref}> <source src={AudioSrc} type="audio/ogg"/></audio> 
    </span>
  )
}

export default FlashCard;
