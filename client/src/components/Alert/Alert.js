import React from 'react'
import styles from './Alert.module.scss'
import classNames from 'classnames/bind';
import { Document,Saving } from '../../assets';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
const container = cx("container");
const info = cx("info");
const answer = cx("answer");
const exp  = cx("exp");
const coin = cx("coin");
const btn = cx("btn");
const options = {baseURL: 'http://localhost:5000/api',method : 'POST',withCredentials: true,};
const Alert = (prop) => {
    const Navigate = useNavigate();
    const {Coin=0,Exp=0,Streak,Correct=0} = prop.data;
    const {difficult,title,price,storyID} = prop.story;
    console.log(prop.story);
    const Submit = () => {
      prop.confirm(storyID);
    }
  if(prop.type!="buy"){
  return (
    <div className={container}>
        <div className={info}>
           <span className={answer}>Số câu hỏi trả lời đúng {Correct}/{prop.total+1}</span>
           <span className={exp}><img src={Document} />+ {Exp} exp</span>
           <span className={coin}><img src={Saving} />+ {Coin} coin</span>
           <span className={btn} onClick={()=>{
            Submit();
           }} ></span>
        </div>
    </div>
    
  )
}else{
  return(
  <div className={container}>
  <div className={info}>
     <span className={answer}>{title}</span>
     <span className={exp}><img src={Document} />{difficult}</span>
     <span className={coin}><img src={Saving} />{price} coin</span>
     <span className={btn} onClick={()=>{
      Submit();
     }} ></span>
  </div>
</div>
  )
}
}

export default Alert