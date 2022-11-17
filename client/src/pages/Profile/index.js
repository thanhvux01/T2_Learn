import React ,{useState,useEffect} from 'react'
import {Container,Row,Col} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './Profile.module.scss'
import classNames from 'classnames/bind';
import { Cow_Avatar } from '../../assets';
import axios from 'axios';
import NavBar from '../../components/NavBar/NavBar';
import SideBar from '../../components/SideBar/SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen , faFire} from '@fortawesome/free-solid-svg-icons';
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
const icon = cx("icon");
const text = cx("text");
const statisBox = cx("statis-box");

const options = {
  baseURL: "http://localhost:5000/api",
  method : 'GET',
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
  const [UserName,SetUserName] = useState("");
  const [CourseData,SetCourseData] = useState([]);
  const [Email,SetEmail] = useState("");
  const GetData = async () => {
    try{
    const user_data = await axios.get("/auth/find",options);
    const courses_data = await axios.get("khoahoc/get-all",options);
    SetUserName(user_data.data.username);
    SetEmail(user_data.data.email);
    SetCourseData(courses_data.data);
    }
    catch(err){
     if(err.response.data.status=401)
     navigate("/login");
    }  
   }
   useEffect(()=>{
    GetData();
 },[])
  return (
    <Container fluid>
    <Row>
     <Col md={2} className={sideBar}><SideBar config={sideBarconfig} /></Col>
     <Col md={10} className={navBar}>
      <NavBar username={UserName} email={Email}/>
      <Row className={content}>
      <div className={info}>
          <span className={avatar}>
           <img src={Cow_Avatar}/>
           <span className={edit}>  <FontAwesomeIcon icon={faPen}/></span>
          </span>
          <span className={quickView}>
             <span>{UserName}</span>
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
          <span className={statisBox}>
          <span className={icon}> <FontAwesomeIcon icon={faFire}/></span>
           <span className={text}>
              <h3>0</h3>
              <h3>Ngày liên tục</h3>
           </span>
          </span>
        </div>
      </div>
      </Row>
     </Col>
    </Row>
   </Container>
  )
}

export default Profile