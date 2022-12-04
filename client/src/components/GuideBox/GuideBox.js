import React,{useEffect, useState} from 'react'
import axios from "axios";
import styles from './GuideBox.module.scss'
import classNames from 'classnames/bind';
import GuideItem from '../GuideItem/GuideItem';
const cx = classNames.bind(styles);
const container = cx("container");
const listWord = cx("list-word");
const options = {baseURL: 'http://localhost:5000/api',withCredentials: true,};
const GuideBox = ({CourseID}) => {
  const [WordData,SetWordData] = useState([]);
  const GetWordByLesson = async () => {
    try{
         const word = await axios.post("/tuvung/find-words-course",{"id":CourseID},options)
         SetWordData(word["data"]);
    }
    catch(err){
       
    }
  }
  useEffect(()=>{
  GetWordByLesson();
  },[])
  return (
    <span className={container}>
         <span className={listWord}>
          {WordData.map((item,i)  =>   <GuideItem key={i} value={item} index={i}/>)   };
         </span>
         </span>
         
  )
}

export default GuideBox