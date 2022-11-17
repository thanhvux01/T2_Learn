import React , {useState,useEffect}from 'react'
import {Container,Row,Col} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './EditProfile.module.scss'
import classNames from 'classnames/bind';
import axios from 'axios';
import NavBar from '../../components/NavBar/NavBar';
import SideBar from '../../components/SideBar/SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen , faFire} from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
const sideBar= cx("side-bar");
const navBar = cx("nav-bar");
const content = cx("content");
const title = cx("title");
const upload = cx("upload");
const contain = cx("contain");
const text = cx("text");
const uploadContent = cx("upload-content");
const btnUpload = cx("btn-upload")
const note = cx("note");
const name = cx("name");
const input = cx("input");
const email = cx("email");



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

const EditProfile = () => {
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
       <span className={title}>Tài khoản</span>
       <span className={contain}>
       <span className={upload}>
           <span className={text}>Ảnh đại diện</span>
           <span className={uploadContent}>
              <span className={btnUpload}>Chọn tập tin</span>
              <span className={note}>Kích thước ảnh tối đa 1 mb</span>
           </span>
       </span>
       <span className={name}>
       <span className={text}>Tên</span>
       <span className={input}>
       <input></input>
       </span>
       </span>
       <span className={email}>
       <span className={text}>Email</span>
       <span className={input}>
       <input></input>
       </span>
       </span>
       </span>
      </Row>
     </Col>
    </Row>
   </Container>
  )
}

export default EditProfile