import React, {useContext} from "react";
import styles from "./InCorrectBox.module.scss";
import { LessonContext } from "../../pages/Lesson";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmark} from "@fortawesome/free-solid-svg-icons"
const cx = classNames.bind(styles);
const icon = cx("icon");
const iconBoxCorrect = cx("icon-box");
const isCorrect = cx("is-correct")

const InCorrectBox = () => {
   const {VocalContent} = useContext(LessonContext)
   
  
  //  console.log(LessonData[Index].content.result);

   return (
    <span className={iconBoxCorrect}>
    <span className={icon}> 
    <FontAwesomeIcon icon={faXmark} />
    </span>
    <span className={isCorrect}>
      <h3>Đáp án đúng là "{VocalContent.content.result}"</h3>
    </span>
    </span>
   )
}

export default InCorrectBox;