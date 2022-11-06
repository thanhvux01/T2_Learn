import React ,{useEffect, useRef, useState}from "react";
import styles from "./ListeningBox.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh,faVolumeLow} from "@fortawesome/free-solid-svg-icons";
import TextCell from "../../TextCell/TextCell";
import axios from "axios";
const cx = classNames.bind(styles);
const container = cx("container");
const title = cx("title");
const listenDiv = cx("listen-div")
const btnSpeaknormal = cx("btn-speak-normal")
const btnSpeakslow = cx("btn-speak-slow");
const choiceDiv = cx("choice-div");
const audioBox = cx("audio-box");

const ListeningBox = (prop) => {
     const content = prop.payload.content;
     const words = prop.words;
    //  console.log(content);
    const [AudioSrc,SetAudioSrc] = useState("");
    const [Choice,SetChoice] = useState({
      "word1":"",
      "word2":"",
      "word3":"",
      "result":"",
    })
     const audioBoxref = useRef();
     const PlayAudioNormal = () => {
         audioBoxref.current.play();
         audioBoxref.current.playbackRate = 1;
     }
     const PlayAudioSlow = () => {
      audioBoxref.current.playbackRate = 0.6;
      audioBoxref.current.play();
     }
     const GetAudio = async () =>{
      //  console.log(content.result);
       const src = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${content.result}`);
       SetAudioSrc(src.data[0].phonetics[0].audio);
    }
    const RandomChoice = async (min=0,max) => {
          // console.log(words[1].name);
          if(words){
          max = words.length;
          // word1 = Math.floor(Math.random() * (max - min) + min);
          // word1 = words[Math.floor(Math.random() * (max - min) + min)].name;
          // word2 = words[Math.floor(Math.random() * (max - min) + min)].name;
          // word3 = words[Math.floor(Math.random() * (max - min) + min)].name;
          // result = content.result;
          SetChoice({
            "word1":words[Math.floor(Math.random() * (max - min) + min)].name,
            "word2":words[Math.floor(Math.random() * (max - min) + min)].name,
            "word3":words[Math.floor(Math.random() * (max - min) + min)].name,
             "result":content.result, 
          });
          }
    }
    useEffect(()=>{
      GetAudio();
      audioBoxref.current.load();
     })
     useEffect(()=>{
      audioBoxref.current.controls = false;
      
     },[])
     useEffect(()=>{
     RandomChoice();
     },[AudioSrc])
  
     return (
              <div className={container}>
                    <div className={title}>Nhấp vào từ bạn nghe thấy được</div>
                    <div className={listenDiv}>
                           <span className={btnSpeaknormal} onClick={()=>{
                              PlayAudioNormal();
                           }}>
                             <FontAwesomeIcon icon={faVolumeHigh}/>
                           </span>
                           <span className={btnSpeakslow} onClick={()=>{
                             PlayAudioSlow();
                           }}>
                             <FontAwesomeIcon icon={faVolumeLow}/>
                           </span>
                    </div>
                    <div className={choiceDiv}>
                        <TextCell value={Choice["word1"]}/>
                        <TextCell value={Choice["word2"]}/>
                        <TextCell value={Choice["word3"]}/>    
                        <TextCell value={Choice["result"]} />
                    </div>
                    <div>
                    <audio controls className={audioBox} ref={audioBoxref}  >
                    <source src={AudioSrc} type="audio/ogg"/>
                   </audio>
                    </div>
              </div>
     )
}

export default ListeningBox;