import React, {useEffect,useState,useRef} from "react";
import styles from "./CorrectBox.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmark,faCheck} from "@fortawesome/free-solid-svg-icons"
const cx = classNames.bind(styles);
const icon = cx("icon");
const iconBoxCorrect = cx("icon-box");
const isCorrect = cx("is-correct")

const CorrectBox = () => {
   return (
    <span className={iconBoxCorrect}>
    <span className={icon}> 
    <FontAwesomeIcon icon={faCheck} />
    </span>
    <span className={isCorrect}>
      <h3>Chính Xác</h3>
    </span>
    </span>
   )
}

export default CorrectBox;