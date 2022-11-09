import React, { useEffect, useState } from 'react'
import styles from './Confirm.module.scss'
import classNames from 'classnames/bind';
import FlashCard from '../FlashCard/FlashCard';
import ColorPicker from '../ColorPicker/ColorPicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark,faCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
const options = {baseURL: 'http://localhost:5000/api',method : 'POST',withCredentials: true,};
const cx = classNames.bind(styles);
const container = cx("container");
const btn = cx("btn");
const interact = cx("interact")
const Confirm = (prop) => {
  const {src} = prop;
  const {Word,Meaning} = prop.data;
  let data = {
    "partofspeech":"",
    "meaning":"",
    "name":"",
    "phonetic":"",
  }
  Word && ( data = {
    "partofspeech":Word.meanings[0].partOfSpeech,
    "meaning":Meaning,
    "name":Word.word,
    "phonetic":Word.phonetic,
  });

  const [Color,SetColor] = useState("linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 0%)");
  const ChangeCardColor = (data) => {
    let left,right;
    if(data){
    left=data.left;
    right=data.right;
   SetColor(`linear-gradient(62deg, #8EC5FC ${left}%, #E0C3FC ${right}%)`);
    }
  }
  const AddCard = async () => {
    axios.post("/tuvung/create-flashcard-searching",{
     "word":data.name,"img":src,
   },options);
   prop.Click();
  }
  useEffect(()=>{
    ChangeCardColor();
  })
  return (
    <div className={container}>
          <FlashCard img={src} data={data} color={Color}/>;
          <ColorPicker ChangeCardColor={ChangeCardColor}/>
          <span className={interact}>
          <span className={btn}>
            <FontAwesomeIcon icon={faXmark} onClick={()=>{
              prop.Click();
            }}/>
          </span>
          <span className={btn} onClick={AddCard}>
            <FontAwesomeIcon icon={faCheck}/>
          </span>
          </span>
    </div>
  )
}

export default Confirm