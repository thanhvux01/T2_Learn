import React,{useState,useEffect,useRef} from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Reading.module.scss';
import classNames from 'classnames/bind';
import NavBar from '../../components/NavBar/NavBar';
import SideBar from '../../components/SideBar/SideBar';
import {Container,Row,Col} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh,faForward,faBackward,faXmark } from '@fortawesome/free-solid-svg-icons';
import Audio from '../../assets/audio';
import Story from '../../assets/story';
import axios from 'axios';
const config = {baseURL: 'http://localhost:5000/api',withCredentials: true,};
const cx = classNames.bind(styles);
const sideBar = cx("side-bar");
const navBar = cx("nav-bar");
const content = cx("content");
const imgBox = cx("img-box");
const main = cx("main");
const text = cx("text");
const interact = cx("interact");
const speak = cx("speak");
const forward = cx("forward");
const backward = cx("backward");
const support = cx("support");
const raw = cx("raw");
const translate = cx("translate-text");

const sideBarconfig = {
    "learning":false,
    "flashcard":false,
    "search":false,
    "story":true,
   }
const Reading = () => {

    
       const {state} = useLocation();
       const nagivate = useNavigate();
       const AudioRef = useRef();
       const AudioState = useRef(true);
       const [AudioDecode,SetAudioDecode] = useState("");
       const [Translate,SetTranslate] = useState("");
       const Raw = useRef("");
       const index = useRef(0); 
       const decodeRef = useRef();
       const [Key,SetKey] = useState(true);
       const supportRef = useRef();
       const sidebarRef = useRef();
       const imageRef = useRef();
       const [Coordinate,SetCoordinate] = useState({"positionX":"40px","positionY":"0px"});
       const [ArrayRaw,SetArrayRaw] = useState(state.content[index.current]["raw"]);
       const  {img} = state.content[index.current];
       
       const [UserInformation,SetUserInformation] = useState({"username":"","email":"",});
       const GetUserData = async () => {
         try{
         const user_data = await axios.get("/auth/find",config);
         user_data && SetUserInformation({"username":user_data.data.username,"email":user_data.data.email});
         }
         catch(err){
          if(err.response.data.status=401)
          nagivate("/login");
         }  
        };
        const ForwardPage = (e) =>{
          e.stopPropagation();
          if(index.current < state.content.length-1){
          index.current = index.current +1;
          SetArrayRaw(state.content[index.current]["raw"]);
        }
      }
        const BackwardPage = (e) =>{
          e.stopPropagation();
          if(index.current != 0 ){
          index.current = index.current-1;
          SetArrayRaw(state.content[index.current]["raw"]);
          }
        }
        const PlayAudio = () =>{
         AudioState.current ? AudioRef.current.play() : AudioRef.current.pause()
         AudioState.current = !AudioState.current;
        }
        const TranslateSelection = async (string) => {
          const translate= await axios.post("/tuvung/translate",{text:string},config);
          if(translate["data"]){
            SetTranslate(translate.data[0].translatedText);
          //  console.log(translatedResult);
          }
         
        }
        const SetAudio = async () =>{
          try{
          
          const audio = await axios.post("/stories/audio-decode",{text:Raw.current,user:UserInformation['username']},config);
          const file = Raw.current.replaceAll(' ','');
          // decodeRef.current.src = `http://localhost:5000/api/stories/audio-source?user=${UserInformation.username}`   
          // decodeRef.current.src = `http://localhost:5000/api/stories/audio-source?user=${UserInformation.username}&file=${file}`;
          SetAudioDecode(`http://localhost:5000/api/stories/audio-source?user=${UserInformation.username}&file=${file}`);
         await decodeRef.current.load();
          decodeRef.current.play();
          
       
          }
          catch(err)
          {
            console.log(err)
          }       
        }
        const PlayAudioSupport = async (e) =>{
          e.stopPropagation();      
          SetAudio();
         
        }
        useEffect(()=>{
         
          AudioRef.current.load();
           })
           useEffect(()=>{         
            GetUserData();      
           },[])
           useEffect(()=>{
            const listText = document.getElementsByClassName("text");
            const selection = window.getSelection();
            for(let i = 0;i<listText.length;i++){
            listText[i].addEventListener("mouseup",(e)=>{
             e.stopPropagation();
             Raw.current = selection.toString();
             TranslateSelection(Raw.current);
             SetCoordinate({"positionX":e.clientX-sidebarRef.current.clientWidth+20,"positionY":e.clientY-imageRef.current.clientHeight-74});
             supportRef.current.style.display = "flex";
             console.log(selection.toString());
            //  console.log("useEffect")
          
            })   
          }     
          return () => {
            for(let i = 0;i<listText.length;i++){
              listText[i].removeEventListener("mouseup",null);
              }
          }
           },[index.current])
          const Cancel = () => {
            supportRef.current.style.display = "none";
          }
    
  return (
    <Container fluid>
    <Row className={main} >
     <Col md={2} className={sideBar} ref={sidebarRef}><SideBar config={sideBarconfig}/></Col>
     <Col md={10} className={navBar}>
       <Row><NavBar username={UserInformation.username} email={UserInformation.email}/></Row>
      <Row className={content} >
         <div className={imgBox} ref={imageRef}>
               <img src={img}/>
         </div>
        <div className={text}>
          {ArrayRaw.map((item,i)=><p key={i} className="text">{item}</p>)}
          <div className={support} ref={supportRef} style={{top:Coordinate.positionY,left:Coordinate.positionX}}>
          <span className={raw}>Gốc:{Raw.current}</span>
          <span className={translate}>Dịch:{Translate}</span>
          <span className={speak} onClick={PlayAudioSupport}><FontAwesomeIcon icon={faVolumeHigh}/></span>
          </div>
        </div>
        <div className={interact}> 
           <span className={speak} onClick={PlayAudio}><FontAwesomeIcon icon={faVolumeHigh}/></span>
           <span className={forward} onClick={ForwardPage}><FontAwesomeIcon icon={faForward}/></span>
           <span className={backward} onClick={BackwardPage}><FontAwesomeIcon icon={faBackward}/></span>
           <span className={backward} onClick={Cancel} style={{backgroundColor:"#E84B4F"}} ><FontAwesomeIcon icon={faXmark} /></span>
           <audio ref={AudioRef}>
           <source src={Audio[state.title][`${index.current}`]} type="audio/mp3" />
           </audio>
          { Key &&  <audio  ref={decodeRef} key={Raw.current} > <source src={AudioDecode} type="audio/mp3" preload="auto" /></audio>  }
        </div>
      </Row>
     </Col>
    </Row>
   </Container>
  )
}
export default Reading;