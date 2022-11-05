import React , {useContext} from "react";
import classNames from "classnames/bind";
import styles from "./TextCell.module.scss";
import { LessonContext } from "../../pages/Lesson";
const cx = classNames.bind(styles);
const Cell = cx("Cell");
const TextCell = (prop) =>  {
     const {GetChoice} = useContext(LessonContext);
     const {value} = prop;  
     return(
        <span className={Cell} onClick={()=>{
            GetChoice(value);
        }}>
             {value}
        </span>
     )
}


export default TextCell;