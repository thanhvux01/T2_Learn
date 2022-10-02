import React  from "react";
import styles from "./headerItemStyles.module.scss";
import { Col } from 'react-bootstrap';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const cx = classNames.bind(styles);
const colItem = cx("col-item");
const icon = cx("icon");
const text = cx("text");

const FuncHeaderItem = ({icon,text,colors})  => {
    return (
      <>
         <Col className={colItem} >
           <div className={icon}>
             <FontAwesomeIcon icon={icon} style={{color:colors}}/>
             {text}
           </div>      
          </Col>
      </>

    )
}
export default FuncHeaderItem;