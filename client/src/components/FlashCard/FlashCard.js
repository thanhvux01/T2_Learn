import React , {useEffect, useRef, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh,faGear} from '@fortawesome/free-solid-svg-icons';
import styles from './FlashCard.module.scss';
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
    const {img,reload,color=defaultColor} = prop;
    const {name,meaning,phonetic,partofspeech} = prop.data; 
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
       const src = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${name}`);
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
      const removePromise = await axios.post(`/tuvung/delete-card`,{word:name},options);
      reload();
    }
    catch(err){
     console.log(err);
    }
  }
  useEffect(()=>{
    // GetAudio();
    audioBoxref.current.load();
  })
  useEffect(()=>{
    audioBoxref.current.controls = false;
  },[])
  return (
    <span  className={flashCard} ref={cardRef} onClick={Turn180} style={{backgroundImage:color}}>
    <span className={frontContent}>
       <span className={title}>{meaning}</span>
       <img src={img}></img>
    </span>
    <span className={backContent} >
      <span className={config} onClick={ShowConfig} ><FontAwesomeIcon icon={faGear}/>
      </span>
       <span className={title}>{name}</span>
       <span className={pronoun} onClick={Speak}>{phonetic} <FontAwesomeIcon icon={faVolumeHigh}/></span>
       <span className={panel} ref={panelRef}>
         <span className={selectSpan}>
         <span className={deleteBtn} onClick={DeleteCard}>Xóa</span>
         <span className={changeBtn}> Sửa</span>
         </span>
           </span>    
    </span>
    <audio controls ref={audioBoxref}> <source src={AudioSrc} type="audio/ogg"/></audio> 
    </span>
  )
}

export default FlashCard;
