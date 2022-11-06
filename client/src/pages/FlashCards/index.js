import React,{useState,useEffect,useContext}from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './FlashCard.module.scss';
import classNames from 'classnames/bind';
import NavBar from '../../components/NavBar/NavBar';
import SideBar from '../../components/SideBar/SideBar';
import {Container,Row,Col} from 'react-bootstrap';
import { Unit1 } from '../../assets/courses';
import FlashCard from '../../components/FlashCard/FlashCard';
const cx = classNames.bind(styles);
const sideBar = cx("side-bar");
const navBar = cx("nav-bar");
const main = cx("main");
const flashCard = cx("flash-card");
const content = cx("content");
const title = cx("title");
const frontContent = cx("front-content");
const backContent = cx("back-content");

const options = {
    baseURL: "http://localhost:5000/api",
    method : 'GET',
    withCredentials: true,
  }
  
const FlashCards = () => {
//   const value = useContext(ThemeContext);
  const sideBarconfig = {
   "learning":false,
   "flashcard":true,
  }
  const nagivate = useNavigate();
  const [UserInformation,SetUserInformation] = useState({"username:":"","email":"",});
  const GetData = async () => {
    try{
    const user_data = await axios.get("/auth/find",options);
    SetUserInformation({"username":user_data.data.username,"email":user_data.data.email});
    }
    catch(err){
     if(err.response.data.status=401)
     nagivate("/login");
    }  
   }
   useEffect(()=>{
    GetData();
   },[])
  return (
    <Container fluid>
    <Row className={main}>
     <Col md={2} className={sideBar}><SideBar config={sideBarconfig}/></Col>
     <Col md={10} className={navBar}>
       <Row><NavBar username={UserInformation.username} email={UserInformation.email}/></Row>
      <Row className={content}>
        <FlashCard name={"Cat"} meaning={"Mèo"} img={Unit1.Animal.Cat}/>
        <FlashCard name={"Cow"} meaning={"Bò"} img={Unit1.Animal.Cow}/>
        <FlashCard name={"Pig"} meaning={"Heo"} img={Unit1.Animal.Pig}/>
      </Row>
     </Col>
    </Row>
   </Container>

  )
}

export default FlashCards;

