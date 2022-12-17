import React ,{useState,useEffect} from 'react'
import {Container,Row,Col,Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './Profile.module.scss'
import classNames from 'classnames/bind';
import Avatar from '../../assets/avatar';
import axios from 'axios';
import StatisBox from '../../components/StatisBox/StatisBox';
import NavBar from '../../components/NavBar/NavBar';
import SideBar from '../../components/SideBar/SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
const sideBar= cx("side-bar");
const navBar = cx("nav-bar");
const info = cx("info");
const avatar = cx("avatar");
const quickView = cx("quick-view");
const edit = cx("edit");
const btnEdit = cx("btn-edit");
const date = cx("date");
const statis = cx("statis");
const content = cx("content");
const statisTitle = cx("statis-title");
const statisContain = cx("statis-contain");

const options = {
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
}
const sideBarconfig = {
  "learning":false,
  "flashcard":false,
  "search":false,
  "story":false,
  "statis":false,
 }

const Profile = () => {
  const navigate = useNavigate();
  const [UserInformation,SetUserInformation] = useState();
  const GetUserData = async () => {
    try{
    const user_data = await axios.get("/auth/find",options);
    const {username,email,exp,coin,streak,accuracy,image} = user_data.data
    user_data && SetUserInformation({username,
    email,
    exp,
    coin,
    image,  
    streak,
    "rate":(Math.floor(accuracy.correct/accuracy.total*100)),
    "correct":accuracy.correct,
    "total":accuracy.total,
    "incorrect":(accuracy.total-accuracy.correct),
  });
 
    }
    catch(err){
     console.log(err);
    }  
   };
 
   useEffect(()=>{
    GetUserData();
 },[])
  return (
    <Container fluid>
    <Row>
     <Col md={2} className={sideBar}><SideBar config={sideBarconfig} /></Col>
     <Col md={10} className={navBar}>
      <NavBar/>
    { UserInformation && <Row className={content}>
      <div className={info}>
          <span className={avatar}>
           <img src={[UserInformation.image]}/>
           <span className={edit}> <FontAwesomeIcon icon={faPen}/></span>
          </span>
          <span className={quickView}>
             <span>{UserInformation.username}</span>
             <span className={date}>Đã tham gia vào ngày 25/10/2022</span>
          </span>
          <span className={btnEdit} onClick={()=>{
             navigate("/edit-profile")
           }}>
          <FontAwesomeIcon icon={faPen}/>
           <span  >Sửa hồ sơ</span>
          </span>
      </div>
     
      <div className={statis}>
        <span className={statisTitle}>Thống kê</span>
        <div className={statisContain}>
         <StatisBox type={"date"} value={UserInformation.streak}/>
         <StatisBox type={"exp"} value={UserInformation.exp}/>
         <StatisBox type={"coin"} value={UserInformation.coin}/>
         <StatisBox type={"accuracy"} value={UserInformation.rate}/>
         <StatisBox type={"correct"} value={UserInformation.correct}/>
         <StatisBox type={"wrong"} value={UserInformation.incorrect}/>
         <StatisBox type={"total"} value={UserInformation.total}/>   
        </div>
      </div>
      </Row> }
     </Col>
    </Row>
   </Container>
  )
}

export default Profile