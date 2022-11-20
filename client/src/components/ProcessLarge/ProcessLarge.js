import React from 'react';
import styles from './ProcessLarge.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
const container = cx("container");
const bar = cx("bar");

const ProcessLarge = (prop) => {
    const {value} = prop;
    const width = Math.floor(value/10*100);
  return (
    <span className={container}>
         <span className={bar} style={{width:`${width}%`}}>
        
         </span>
    </span>
  )
}

export default ProcessLarge