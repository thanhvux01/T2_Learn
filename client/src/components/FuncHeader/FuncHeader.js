import React from "react";
import { Container , Row , Col , } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from "./funcHeaderStyles.module.scss"
import FuncHeaderItem from "../FuncHeaderItem/FuncHeaderItem";
import { faLanguage ,faBook , faGamepad ,faCommentDots} from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);
const header = cx("header-box");
const row = cx("row");
const col = cx("col");
const userCol = cx("user-col");
const rowItem = cx("row-item");



const FuncHeader = () => {
 return (

    <Container fluid className={header}>
        <Row className={row}>
         <Col xl={5} className={col}>
           <Row className={rowItem}>
           <FuncHeaderItem icon={faLanguage} text="Tra từ điển" colors="#21B6A8" />
           <FuncHeaderItem icon={faGamepad} text="Trò chơi" colors="#FF3131"/>
           <FuncHeaderItem icon={faBook} text="Bài học" colors="#FFBE7C"/>
           <FuncHeaderItem icon={faCommentDots} text="Hỏi đáp" colors="#"/>
           </Row>
         </Col>
         <Col xl={5}>

         </Col>
         
        </Row>
    </Container>
 )

}

export default FuncHeader