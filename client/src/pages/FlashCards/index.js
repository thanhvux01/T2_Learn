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
const content = cx("content");

const config = {
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
  }
  
const FlashCards = () => {
//   const value = useContext(ThemeContext);
  const sideBarconfig = {
   "learning":false,
   "flashcard":true,
   "search":false,
  }
  const nagivate = useNavigate();
  const [UserInformation,SetUserInformation] = useState({"username:":"","email":"",});
  const [ListCards,SetListCards] = useState([])
  const [State,SetState] = useState("");
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
  const SetFlashCard = async () => {
    try{
    const list_card = await axios.post('/tuvung/get-cards',{},config);
    list_card && SetListCards(list_card.data);
    }
    catch(err){
      console.log(err)
    }
  }
  const Reload = async () => {
  SetFlashCard();
  }
   useEffect(()=>{
    GetUserData();
    SetFlashCard();
   },[])
  return (
    <Container fluid>
    <Row className={main}>
     <Col md={2} className={sideBar}><SideBar config={sideBarconfig}/></Col>
     <Col md={10} className={navBar}>
       <Row><NavBar username={UserInformation.username} email={UserInformation.email}/></Row>
      <Row className={content}>
        {ListCards.map((item)=><FlashCard key={item._id} img={Unit1.Animal[item.name]} data={item}
       reload={Reload} />)}
        <span>{State}</span>
      </Row>
     </Col>
    </Row>
   </Container>

  )
}

export default FlashCards;

