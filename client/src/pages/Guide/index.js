import React,{useState,useEffect,useContext}from 'react';
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import styles from './Guide.module.scss';
import classNames from 'classnames/bind';
import NavBar from '../../components/NavBar/NavBar';
import SideBar from '../../components/SideBar/SideBar';
import {Container,Row,Col} from 'react-bootstrap';
import GuideBox from '../../components/GuideBox/GuideBox';
import Introduce from '../../components/Introduce/Introduce';
const cx = classNames.bind(styles);
const sideBar = cx("side-bar");
const navBar = cx("nav-bar");
const main = cx("main");
const content = cx("content");


const config = {
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
  }
  const sideBarconfig = {
    "learning":false,
    "flashcard":false,
    "search":false,
    "story":false,
   }
const Guide= () => {
//   const value = useContext(ThemeContext);
  
  const navigate = useNavigate();
  const {state} = useLocation();
  const [UserInformation,SetUserInformation] = useState({"username":"","email":"",});
  const GetUserData = async () => {
    try{
    const user_data = await axios.get("/auth/find",config);
    user_data && SetUserInformation({"username":user_data.data.username,"email":user_data.data.email});
    }
    catch(err){
     if(err.response.data.status=401)
     navigate("/login");
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
           <Introduce courseID={state.id}/>
           <GuideBox  CourseID={state.id}/>
      </Row>
     </Col>
    </Row>
   </Container>
  
  )
}

export default Guide;

