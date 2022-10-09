import React from "react";
import {Container,Row,Col} from "react-bootstrap"
import styles from "./homeContain.module.scss"
import classNames from "classnames/bind";
import {Fox} from "../../assets";
import { useNavigate } from 'react-router-dom';
var cx = classNames.bind(styles);
const intro = cx("intro-box");
const col = cx("col");
const row = cx("row");
const slash = cx("slash")
const HomeContain = (prop) => {
  let navigate = useNavigate();
  
  return (
    <>
      <Container fluid className={intro}>
        
        <Row className={row}>
            <Col className={col} xl={3}>
            <img alt="feature" src={prop.image} onClick={()=>{
              navigate("/search");
            }}/>

            </Col>
            <Col xl={6} className={col}>
                <h1>{prop.title} </h1>
                <p>{prop.content}</p>

            </Col>
        </Row>
        <Row className={slash}>
             <div></div>
        </Row>

      </Container>

    </>
  )

}
export default HomeContain;