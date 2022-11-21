import React,{useEffect, useRef , useState} from 'react'
import styles from './Shuffle.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHippo, faPenClip ,faBullseye } from '@fortawesome/free-solid-svg-icons';
import { Ruler,Pencil,chest,chestopen} from '../../assets';
import axios from "axios";
import Process from '../Process/Process';
const cx = classNames.bind(styles);
const container = cx("container");
const stat = cx("stat");
const card = cx("card");
const cardBox = cx("card-box")
const tool = cx("tool");
const lesson = cx("lesson");
const btn = cx("btn");
const number = cx("number");
const mission = cx("mission");
const list = cx("list");
const process = cx("process");
const options = {baseURL: 'http://localhost:5000/api',withCredentials: true,};
const Shuffle = () => {
    const Navigate = useNavigate();
    const card1 = useRef();
    const card2 = useRef();
    const card3 = useRef();
    const card4 = useRef();
    const card5 = useRef();
    const tool1 = useRef();
    const tool2 = useRef();
    const [Open,SetOpen] = useState(false);
    const practice = useRef();
    const [Daily,SetDaily] = useState("");
    const init = useRef(true);
    const SetPosition = () => {
       if(init.current) {
       card2.current.style.transform = "translate(-70%,-50%) rotate(-10deg)";
       card3.current.style.transform = "translate(-40%,-50%) rotate(10deg)";
       card4.current.style.transform = "translate(-90%,-50%) rotate(-15deg)";
       card5.current.style.transform = "translate(-20%,-50%) rotate(15deg)";
       tool1.current.style.transform = "translate(-120%,-50%) rotate(150deg)";
       tool2.current.style.transform = "translate(-10%,-30%) rotate(180deg)";
       practice.current.style.display = "flex";
       init.current = !init.current
       }else{
        card2.current.style.transform = "translate(-50%,-50%) rotate(-5deg)";
        card3.current.style.transform = "translate(-50%,-50%) rotate(5deg)";
        card4.current.style.transform = "translate(-50%,-50%) rotate(-10deg)";
        card5.current.style.transform = "translate(-50%,-50%) rotate(10deg)";
        tool1.current.style.transform = "translate(-50%,-30%) rotate(10deg)";
        tool2.current.style.transform = "translate(-50%,-30%) rotate(180deg)";
        init.current = !init.current
        practice.current.style.display = "none";
       }
    }
    const GetDaily = async () => {
        try{
       const DailyData = await axios.get("/user/getdaily",options);
       SetDaily(DailyData.data.total);
      }catch(err){
           console.log(err);
        }
    }
    useEffect(()=>{
          GetDaily();
          DailyReward();
    },[])
    const DailyReward = async () => {
        const result = await axios.post("/user/checkdailyreward",{},options);
        if(result.data == "Not Enough"){
            
        }else{
          SetOpen(true);
        }

    }
    
  return (
    <div className={container}>
         <span className={stat}>
            <span className={number}>Số từ đã học hôm nay: {Daily}</span>
            <span className={mission}>
           {!Open && <img src={chest} onClick={DailyReward} /> }
           {Open && <img src={chestopen}/> } 
            <span className={list}>
                 <span className={number}>
                   <span>0</span>
                   <span>10</span>
                 </span>
                <Process value={Daily}/>  
            </span>
            
            </span>
         </span>
         <span className={cardBox} onClick={()=>{
            SetPosition();
         }}>
            <span className={card} ref={card1}>
                <FontAwesomeIcon icon={faHippo}/>
            </span>
            <span className={card} ref={card2}>
                <FontAwesomeIcon icon={faHippo}/>
            </span>
            <span className={card} ref={card3}>
                <FontAwesomeIcon icon={faHippo}/>
            </span>
            <span className={card} ref={card4}>
                <FontAwesomeIcon icon={faHippo}/>
            </span>
            <span className={card} ref={card5}>
                <FontAwesomeIcon icon={faHippo}/>
            </span>
            <span className={tool} ref={tool1}>
               <img src={Ruler} />
            </span>
            <span className={tool} ref={tool2}>
               <img src={Pencil} />
            </span>
            <span className={lesson} ref={practice}>
                 <span className={btn} onClick={(e)=>{
                   e.preventDefault();
                   Navigate("/flashcard");
                 }}>ÔN TẬP</span>
            </span>
         </span>
    </div>
  )
}

export default Shuffle