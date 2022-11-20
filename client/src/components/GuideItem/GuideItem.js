import React, { useEffect,useRef,useState } from 'react';
import styles from './GuideItem.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faVolumeHigh,faChevronLeft,faChevronRight} from "@fortawesome/free-solid-svg-icons"
const cx = classNames.bind(styles);
const word = cx("word");
const chevron = cx("chevron");
const cover = cx("cover");
const speak = cx("speak");
const conversation = cx("conversation");
const conversationLeft = cx("conversation-left");
const GuideItem = (prop) => {
    const audioBoxref = useRef();
    const {value,index} = prop;
    const [AudioSrc,SetAudioSrc] = useState("");
    const PlayAudioNormal = () => {
        audioBoxref.current.load();
        audioBoxref.current.play();
    }
    const GetAudio = async () =>{
        //  console.log(content.result);
    
         const src = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${value["name"]}`);
         SetAudioSrc(src.data[0].phonetics[0].audio);
      }
      useEffect(()=>{
           GetAudio();
           audioBoxref.current.load();
        
      },[])
  if(index%2){
  return (
    <span className={conversation}>
    <span className={word}>
       <span>{value["meaning"]}: </span>
       <span>{value["name"]}</span>
    </span>
       <span className={speak}>
         <span>{value["phonetic"]}</span>
         <FontAwesomeIcon icon={faVolumeHigh} onClick={PlayAudioNormal} />
       </span>
       <span className={chevron}>
       <FontAwesomeIcon icon={faChevronLeft}/>
       </span>
       <span className={cover}> </span>
       <audio   ref={audioBoxref}  >
         <source src={AudioSrc} type="audio/ogg"/>
        </audio>
   </span>
  )
  }
  else{
     return(
    <span className={conversationLeft}>
    <span className={word}>
       <span>{value["meaning"]} : </span>
       <span>{value["name"]}</span>
    </span>
       <span className={speak}>
         <span>{value["phonetic"]}</span>
         <FontAwesomeIcon icon={faVolumeHigh} onClick={PlayAudioNormal}/>
       </span>
       <span className={chevron}>
       <FontAwesomeIcon icon={faChevronRight}/>
       </span>
       <span className={cover}> </span>
       <audio  ref={audioBoxref}  >
         <source src={AudioSrc} type="audio/ogg"/>
        </audio>
   </span>
     )
  }
}

export default GuideItem



