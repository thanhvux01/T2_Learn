import React,{useEffect, useRef} from 'react';
import styles from './ColorPicker.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
const container = cx("container");
const leftGradient = cx("left-gradient")
const rightGradient = cx("right-gradient")
const leftGradientbar = cx("left-gradient-bar")
const rightGradientbar = cx("right-gradient-bar")
const leftcircle = cx("left-circle");
const rightcircle = cx("right-circle");


const ColorPicker = (prop) => {
  const {ChangeCardColor} = prop
  const circleRefL = useRef();
  const circleRefR = useRef();
  const inputRefL = useRef();
  const inputRefR = useRef();
  useEffect(()=>{
  })
  const ScrollLeft = (e) => {
       e.stopPropagation();
       circleRefL.current.style.transform = `translate(-1px,${inputRefL.current.value*1.5}px`;
       ChangeCardColor({"left":inputRefL.current.value,"right":inputRefR.current.value});
  }
  const ScrollRight = (e) => {
    e.stopPropagation();
    circleRefR.current.style.transform = `translate(-1px,${inputRefR.current.value*1.5}px`;
    ChangeCardColor({"left":inputRefL.current.value,"right":inputRefR.current.value});
  }
  useEffect(()=>{
    ChangeCardColor({"left":inputRefL.current.value,"right":inputRefR.current.value});
  },[])
  return (
    <div className={container}>
        <div className={leftGradient}>
              <div className={leftGradientbar}>
              <span className={leftcircle} ref={circleRefL}></span>
               <input type="range" min="0" max="100" step="0.05" defaultValue="0" ref={inputRefL} onChange={ScrollLeft}></input>
              </div>
        </div>
        <div className={rightGradient}>
              <div className={rightGradientbar}>
              <span className={rightcircle} ref={circleRefR}></span>
               <input type="range" min="0" max="100" step="0.05" defaultValue="0" ref={inputRefR} onChange={ScrollRight}></input>
              </div>
        </div>
    </div>
  )
}

export default ColorPicker
