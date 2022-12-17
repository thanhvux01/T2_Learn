import React from 'react'
import styles from './UserBar.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
const container = cx("container");
const index = cx("index");
const info = cx("info");
const colName = cx("name");
const colExp = cx("exp");
const colRate = cx("rate");
const question = cx("question");
const UserBar = ({name,email,exp,accuracy,image,rank}) => {
const URL2 = "https://res.cloudinary.com/dicgj8bdg/image/upload/v1670485999/Lion_Avatar_wbbj4n.png";
  return (
    <div className={container}>
        <div className={index}>{rank}th</div>
        <div className={info}>
            <img src={URL2}/>
            <div className={colName}>
                <span>{name}</span>
                <span>{email}</span>
            </div>
            <div className={colExp}>
                 {exp} 
            </div>
            <div className={colRate}>

                 {
                  accuracy.total !=0 && Math.floor((accuracy.correct/accuracy.total)*100) +"%"
                 }
                 {
                    accuracy.total ==0 && 0 + "%"
                 }
            </div>
            <div className={question}>
                 {accuracy.total}
            </div>
        </div>
    </div>
  )
}

export default UserBar