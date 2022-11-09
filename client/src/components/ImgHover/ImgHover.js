import React , {useEffect, useRef}from 'react'
import styles from './ImgHover.module.scss'
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagicWandSparkles } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
const container = cx("container");
const filter = cx("filter");
 const ImgHover = (prop) => {
 const {src,width,height,Click}  = prop;
 const filterRef = useRef();
 useEffect(()=>{
 })
 const FilterOn = () => {
   filterRef.current.style.display = "flex";
 }
 const FilterOff = () => {
  filterRef.current.style.display = "none";
}
  return (

    <span className={container}  style={{width,height}} onMouseOver={FilterOn} onMouseLeave={FilterOff} onClick={()=>{
      Click(src);
    }}>
      <img src={src} >
      </img>
      <span className={filter} ref={filterRef}><FontAwesomeIcon icon={faMagicWandSparkles}/></span>
    </span>
  )
}

export default ImgHover;