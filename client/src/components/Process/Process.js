import React from 'react';
import styles from './Process.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
const container = cx("container");
const bar = cx("bar");

const Process = (prop) => {
    const {value} = prop;
    const width = Math.floor(value/10*100);
  return (
    <span className={container}>
         <span className={bar} style={{width:`${width}%`}}>
        
         </span>
    </span>
  )
}

export default Process