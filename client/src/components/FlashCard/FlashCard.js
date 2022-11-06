import React from 'react';
import styles from './FlashCard.module.scss';
import classNames from 'classnames/bind';
import { Unit1 } from '../../assets/courses';
const cx = classNames.bind(styles);
const title = cx("title");
const flashCard = cx("flash-card");
const frontContent = cx("front-content");
const backContent = cx("back-content");
 const FlashCard = (prop) => {
    const {name,meaning,img} = prop;
  return (
    <span className={flashCard}>
    <span className={frontContent}>
       <span className={title}>{meaning}</span>
       <img src={img}></img>
    </span>
    <span className={backContent}>
       <span className={title}>{name}</span>     
    </span>
    </span>
  )
}

export default FlashCard;
