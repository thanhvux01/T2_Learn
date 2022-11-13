import React,{useState,useEffect,useRef} from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Reading.module.scss';
import classNames from 'classnames/bind';
import NavBar from '../../components/NavBar/NavBar';
import SideBar from '../../components/SideBar/SideBar';
import {Container,Row,Col} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh,faForward,faBackward } from '@fortawesome/free-solid-svg-icons';
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
       const index = useRef(0); 
       const [ArrayRaw,SetArrayRaw] = useState(state.content[index.current]["raw"]);
       const  {img} = state.content[index.current];
       
       const [UserInformation,SetUserInformation] = useState({"username:":"","email":"",});
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
          console.log(index.current);
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
        
        AudioRef.current.play();
        }
        useEffect(()=>{
            GetUserData();
          
           },[])
           useEffect(()=>{
            AudioRef.current.load();

            const listText = document.getElementsByClassName("text");
            const selection = window.getSelection();
            for(let i = 0;i<listText.length;i++){
            listText[i].addEventListener("mouseup",()=>{
             console.log(selection.toString());
            })   
          }     
           })
          
    
  return (
    <Container fluid>
    <Row className={main}>
     <Col md={2} className={sideBar}><SideBar config={sideBarconfig}/></Col>
     <Col md={10} className={navBar}>
       <Row><NavBar username={UserInformation.username} email={UserInformation.email}/></Row>
      <Row className={content}>
         <div className={imgBox}>
               <img src={Story[state.title][img]}/>
         </div>
        <div className={text}>
          {ArrayRaw.map((item,i)=><p key={i} className="text">{item}</p>)}
        </div>
        <div className={interact}> 
           <span className={speak} onClick={PlayAudio}><FontAwesomeIcon icon={faVolumeHigh}/></span>
           <span className={forward} onClick={ForwardPage}><FontAwesomeIcon icon={faForward}/></span>
           <span className={backward} onClick={BackwardPage}><FontAwesomeIcon icon={faBackward}/></span>
           <audio ref={AudioRef}>
           <source src={Audio[state.title][`${index.current}`]} type="audio/mp3" />
           </audio>
        </div>
      </Row>
     </Col>
    </Row>
   </Container>
  )
}
export default Reading;