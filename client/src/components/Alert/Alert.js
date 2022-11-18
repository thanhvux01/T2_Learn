import React from 'react'
import styles from './Alert.module.scss'
import classNames from 'classnames/bind';
import { Document,Saving } from '../../assets';
const cx = classNames.bind(styles);
const container = cx("container");
const info = cx("info");
const answer = cx("answer");
const exp  = cx("exp");
const coin = cx("coin");
const btn = cx("btn");
const Alert = (prop) => {
    const {Coin,Exp,Streak,Correct} = prop.data;
    
  return (
    <div className={container}>
        <div className={info}>
           <span className={answer}>Số câu hỏi trả lời đúng {Correct}/{prop.total}</span>
           <span className={exp}><img src={Document} />+ {Exp} exp</span>
           <span className={coin}><img src={Saving} />+ {Coin} coin</span>
           <span className={btn}></span>
        </div>
    </div>
  )
}

export default Alert