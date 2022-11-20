import React ,{useState,useEffect} from 'react'
import {Container,Row,Col,Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './Profile.module.scss'
import classNames from 'classnames/bind';
import { Cow_Avatar } from '../../assets';
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
 }

const Profile = () => {
  const navigate = useNavigate();
  const [UserInformation,SetUserInformation] = useState({"username":"","email":"","exp":"","coin":"","streak":""});
  const GetUserData = async () => {
    try{
    const user_data = await axios.get("/auth/find",options);
    console.log(user_data);
    user_data && SetUserInformation({"username":user_data.data.username,
    "email":user_data.data.email,
    "exp":user_data.data.exp,
    "coin":user_data.data.coin,
    "streak":user_data.data.streak,
    "accuray":(Math.floor(user_data.data.accuracy["correct"]/user_data.data.accuracy["total"]*100)),
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
      <NavBar username={UserInformation.username} email={UserInformation.email}/>
      <Row className={content}>
      <div className={info}>
          <span className={avatar}>
           <img src={Cow_Avatar}/>
           <span className={edit}>  <FontAwesomeIcon icon={faPen}/></span>
          </span>
          <span className={quickView}>
             <span>{UserInformation.username}</span>
             <span className={date}>Đã tham gia vào ngày 25/10/2022</span>
          </span>
          <span className={btnEdit}>
          <FontAwesomeIcon icon={faPen}/>
           <span>Sửa hồ sơ</span>
          </span>
      </div>
     
      <div className={statis}>
        <span className={statisTitle}>Thống kê</span>
        <div className={statisContain}>
         <StatisBox type={"date"} value={UserInformation.streak}/>
         <StatisBox type={"exp"} value={UserInformation.exp}/>
         <StatisBox type={"coin"} value={UserInformation.coin}/>
         <StatisBox type={"accuracy"} value={UserInformation.accuray}/>
        </div>
      </div>
      </Row>
     </Col>
    </Row>
   </Container>
  )
}

export default Profile