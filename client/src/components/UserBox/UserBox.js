import React from 'react'
import styles from './UserBox.module.scss'
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
const container = cx("container");
const header = cx("header");
const content = cx("content");
const footer = cx("footer");
const popup = cx("popup");
const text = cx("text");
const inFooter = cx("in-footer");
const inFooterBronze = cx("in-footer-bronze");
const inFooterSilver = cx("in-footer-silver");
const middle = cx("large","container");
const side = cx("small","container");
const header1st = cx("header","first");

const UserBox = ({exp,rank,name,img}) => {

   if(rank=="1"){
  return (
    <div className={middle} >
          <div className={header1st}>
           {exp}
          </div>
          <div className={content}>
            <div className={popup}>
              <img src={img}/>
              <span className={text}>{name}</span>
            </div> 
          </div>
          <div className={footer}>
            <div className={inFooter}>
            <FontAwesomeIcon icon={faCrown}/> 
            </div>
          </div>
    </div>
  )
   }else{
    return (
        <div className={side} >
              <div className={header}>
               {exp}
              </div>
              <div className={content}>
                <div className={popup}>
                  <img src={img}/>
                  <span className={text}>{name}</span>
                </div> 
              </div>
              <div className={footer}>
                {rank==2 &&  <div className={inFooterBronze}>
                   <FontAwesomeIcon icon={faCrown}/> 
                </div> }
                {rank==3 &&  <div className={inFooterSilver}>
                   <FontAwesomeIcon icon={faCrown}/> 
                </div> }
                
              </div>
        </div>
      )
   }
}

export default UserBox