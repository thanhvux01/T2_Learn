import React,{useState,useEffect,useContext}from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import styles from './FlashCard.module.scss';
import classNames from 'classnames/bind';
import EditFlashcard from '../../components/EditFlashcard/EditFlashcard';
import NavBar from '../../components/NavBar/NavBar';
import SideBar from '../../components/SideBar/SideBar';
import {Container,Row,Col} from 'react-bootstrap';
import FlashCard from '../../components/FlashCard/FlashCard';
import BluePopup from "../../components/BluePopup/BluePopup";
const cx = classNames.bind(styles);
const sideBar = cx("side-bar");
const navBar = cx("nav-bar");
const main = cx("main");
const rev = cx("rev");
const content = cx("content");
const mode = cx("mode");
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
   "story":false,
   "statis":false,
  }
  const navigate = useNavigate();
  const [UserInformation,SetUserInformation] = useState({"username":"","email":"","coin":0,"exp":0});
  const [ListCards,SetListCards] = useState([])
  const [Popup,SetPopup] = useState(false);
  const [Word,SetWord] = useState("");
  const [Edit,SetEdit] = useState(false);

  const GetUserData = async () => {
    try{
    
      const user_data = await axios.get("/auth/find",config);
      user_data && SetUserInformation({"exp":user_data.data.exp,"coin":user_data.data.coin});
    }
    catch(err){
     if(err.response.data.status=401)
     navigate("/login");
    }  
   };
  const SetFlashCard = async () => {
    try{
    const list_card = await axios.post('/tuvung/get-cards',{},config);
    // console.log(list_card.data);
    list_card && SetListCards(list_card.data);
    }
    catch(err){
      console.log(err)
    }
  }
  const Reload = async () => {
  SetFlashCard();
  }
  const ShowPopup =  () =>{
    SetPopup(!Popup);
  }
  const ShowEdit =  () =>{
    SetEdit(!Edit);
    SetFlashCard();
  }
  const CardToEdit = (word) => {
    SetWord(word);
    SetEdit(!Edit);
  }
  const CheckCondition = async(number) => {
    try{
       config.params = {number};
       await axios.get("/khoahoc/revision",config)
       navigate("/lesson",{state:{id:false,number:number}})
     }catch(err){
         console.log(err);
         SetPopup(!Popup);
     }
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
       <NavBar  coin={UserInformation.coin} exp={UserInformation.exp}/>
      <Row className={content}>
        {ListCards.map((item)=><FlashCard key={item._id} img={item.img} data={item}
       reload={Reload} CardToEdit={CardToEdit} />)}

       <div className={rev} >
            <span className={mode} onClick={
            
             ()=>{CheckCondition(10)}
            }>10</span>
            <span className={mode} onClick={
              ()=>{CheckCondition(20)}
            }>20</span>
            <span className={mode} onClick={
              ()=>{CheckCondition(0)}
            }>All</span> 
       </div>
       {Popup && <BluePopup ShowPopup={ShowPopup} type={false}/> }
       {Edit && <EditFlashcard ShowEdit={ShowEdit} word={Word}/> }
      </Row>
     </Col>
    </Row>
  
   </Container>

  )
}

export default FlashCards;

