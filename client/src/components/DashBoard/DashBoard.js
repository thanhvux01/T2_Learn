import React from "react";
import styles from "./DashBoard.module.scss";
import classNames from "classnames/bind";
import { Button } from "react-bootstrap";
const cx = classNames.bind(styles);
const container = cx("container");
const boxLeft = cx("box-left");
const boxRight =cx("box-right");
const bulletin = cx("bulletin");
const streakBox = cx("streak-box");
const leftspace = cx("left-space");
const bottomBox = cx("bottom-box")
const btn = cx("btn");

const DashBoard = () =>{

    return (
        <div className={container}>
        <div className={bulletin}>
        <div className={boxLeft}>
                <h3>0</h3>
                <h4>Tổng số từ và câu bạn đã học trong hôm nay</h4>
            </div>
            <div className={boxRight}>
                <span> Mỗi ngày chúng tôi sẽ giới thiệu từ mới cho bạn ở đây</span>
                <div className={bottomBox}>
                     <span>Thử ôn lại kiến thức của bạn trong 5 phút!!</span>
                    <Button className={btn}>HERE</Button>
                </div>
            </div>
        </div>
        <div className={streakBox}>
              
        </div>
        </div>
    )
    
}

export default DashBoard;