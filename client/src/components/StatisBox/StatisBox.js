import React from 'react'
import styles from './StatisBox.module.scss'
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFire,faCoins,faBookTanakh,faCrosshairs,faCheck,faXmark,faSheetPlastic} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
const icon = cx("icon");
const text = cx("text");
const statisBox = cx("statis-box");
const property = cx("property");
const breakln = cx("break");
const StatisBox = (prop) => {
    const {value,type} = prop;
    if(type=="date") {
  return (
    <span className={statisBox}>
    <span className={icon}> <FontAwesomeIcon icon={faFire}/></span>
     <span className={text}>
        <h3>Ngày liên tục</h3>
     </span>
     <span className={breakln}></span>
         <span className={property}>{value}</span>
    </span>
  )
}else if(type=="exp"){
    return (
        <span className={statisBox}>
        <span className={icon}> <FontAwesomeIcon icon={faBookTanakh}  style={{color:"#35A4FB"}} /></span>
         <span className={text}>
            <h3>Tổng kinh nghiệm</h3>
         </span>
         <span className={breakln}></span>
         <span className={property}>{value}</span>
        </span>
    )
}else if(type =="coin"){
    return (
        <span className={statisBox}>
        <span className={icon}> <FontAwesomeIcon icon={faCoins} style={{color:"#FFCB2E"}}/></span>
         <span className={text}>
            <h3>Tổng số coin</h3>
         </span>
         <span className={breakln}></span>
         <span className={property}>{value}</span>
        </span>
    )
}else if(type =="accuracy"){
    return (
        <span className={statisBox}>
        <span className={icon}> <FontAwesomeIcon icon={faCrosshairs} style={{color:"#E32227"}}/></span>
         <span className={text}>
            <h3>Tỉ lệ chính xác</h3>
         </span>
         <span className={breakln}></span>
         <span className={property}>{value}%</span>
        </span>
    )
}
else if(type =="correct"){
    return (
        <span className={statisBox}>
        <span className={icon}> <FontAwesomeIcon icon={faCheck} style={{color:"#50C878"}}/></span>
         <span className={text}>
            <h3>Số câu trả lời đúng</h3>
         </span>
         <span className={breakln}></span>
         <span className={property}>{value}</span>
        </span>
    )
}else if(type =="wrong"){
    return (
        <span className={statisBox}>
        <span className={icon}> <FontAwesomeIcon icon={faXmark} style={{color:"#E32227"}}/></span>
         <span className={text}>
            <h3>Số câu trả lời sai</h3>
         </span>
         <span className={breakln}></span>
         <span className={property}>{value}</span>
        </span>
    )
}
else if(type =="total"){
    return (
        <span className={statisBox}>
        <span className={icon}> <FontAwesomeIcon icon={faSheetPlastic} style={{color:"#088FFA"}}/></span>
         <span className={text}>
            <h3>Tổng số câu đã thực hiện</h3>
         </span>
         <span className={breakln}></span>
         <span className={property}>{value}</span>
        </span>
    )
}
}

export default StatisBox