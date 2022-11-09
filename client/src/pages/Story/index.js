import React,{useState,useEffect} from 'react';
import styles from './Story.module.scss';
import classNames from 'classnames/bind';
import NavBar from '../../components/NavBar/NavBar';
import SideBar from '../../components/SideBar/SideBar';
import {Container,Row,Col} from 'react-bootstrap';
import { Unit1 } from '../../assets/courses';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const config = {baseURL: 'http://localhost:5000/api',method : 'POST',withCredentials: true,};
const cx = classNames.bind(styles);
const sideBar = cx("side-bar");
const navBar = cx("nav-bar");
const main = cx("main");
const content = cx("content");
const Story = () => {

    const sideBarconfig = {
        "learning":false,
        "flashcard":false,
        "search":false,
        "story":true,
       }
       const nagivate = useNavigate();
       const [UserInformation,SetUserInformation] = useState({"username:":"","email":"",});
       const GetUserData = async () => {
         try{
         const user_data = await axios.get("/auth/find",config);
         user_data && SetUserInformation({"username":user_data.data.username,"email":user_data.data.email});
         }
         catch(err){
          if(err.response.data.status=401)
          nagivate("/login");
         }  
        };
        useEffect(()=>{
            GetUserData();
           },[])
  return (
    <Container fluid>
    <Row className={main}>
     <Col md={2} className={sideBar}><SideBar config={sideBarconfig}/></Col>
     <Col md={10} className={navBar}>
       <Row><NavBar username={UserInformation.username} email={UserInformation.email}/></Row>
      <Row className={content}>
      
      </Row>
     </Col>
    </Row>
   </Container>
  )
}

export default Story