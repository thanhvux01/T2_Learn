import React, { useRef,forwardRef,useEffect,useState} from 'react'
import styles from './StoryBox.module.scss'
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import Story from '../../assets/story';
import axios from "axios";
import { lock } from '../../assets';
const cx = classNames.bind(styles);
const imgCard = cx("img-card");
const detail = cx("detail-box");
const detailLock = cx("detail-lock");
const title = cx("title");
const length = cx("length");
const level = cx("difficult");
const btn = cx("btn");
const background = cx("background");
const options = {baseURL: 'http://localhost:5000/api',withCredentials: true,};
const StoryBox = (prop,ref) => {
  const Navigate = useNavigate();
  const {title,difficult,content,storyID} = prop.data;
  const {index,Click} = prop;
  const [Confirm,SetConfirm] = useState();
  const [Lock,SetLock] = useState(true);
//   const detailRef = useRef();
  const CheckOwn = async () => {
     const own = await axios.post("/stories/buy-story",{storyID},options)
     if(own.data=="Owned"){
       SetLock(true);
     }else if(own.data=="Not Owned"){
      SetLock(false);
     }
  }
  useEffect(()=>{
       CheckOwn();
  },[])
  if(Lock){
  return (
    <div className={imgCard} onClick={(e)=>{
        e.stopPropagation();
        Click(index)}}>
                <img src={Story[title]["Cover"]}></img>       
                <span className={detail} ref={ref}>
                  <span className={title}>{title}</span>
                  <span className={length}>Độ dài : <span>1000 từ</span></span>
                  <span className={level}>Độ khó: <span>{difficult}</span></span>
                  <span className={btn} onClick={(e)=>{
                    e.stopPropagation();
                    Navigate("/reading",{state:{content:content,title:title}});
                  }}>Đọc</span>
                  <span className={background} style={{backgroundImage:`url(${Story.Background})`}}></span>
                </span>  
        
            
     </div>
  )
                }else{
                  return(
                  <div className={imgCard} onClick={(e)=>{
                    e.stopPropagation();
                    Click(index)}}>
                            <img src={Story[title]["Cover"]}></img>       
                            <span className={detail} ref={ref}>
                              <span className={detailLock}>
                              <img src={lock}/>
                              </span>
                              <span className={btn} onClick={(e)=>{prop.PopUp(index)}}>Mở khóa</span>
                            </span>              
                      
                 </div>
                  )

                }
}

export default forwardRef(StoryBox);