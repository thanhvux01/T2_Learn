import React, { useEffect ,useRef,useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import NavBar from "../../components/NavBar/NavBar";
import DashBoard from "../../components/DashBoard/DashBoard";
import {Container,Row,Col} from "react-bootstrap"
import axios from "axios";
import {Navigate, useNavigate} from "react-router-dom";
import CourseBox from "../../components/CourseBox/CourseBox";
import Shuffle from "../../components/Shuffle/Shuffle";
import styles from "./LearningPage.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const container = cx("container");
const sideBar= cx("side-bar")
const navBar = cx("nav-bar")

const options = {
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
}
const sideBarconfig = {
  "learning":true,
  "flashcard":false,
  "search":false,
  "story":false,
  "statis": false,
 }

const LearningPage = () => {
  const navigate = useNavigate();
  const [UserInformation,SetUserInformation] = useState({"coin":0,"exp":0});
  const [CourseData,SetCourseData] = useState([]);
  const GetData = async () => {
    try{
    const user_data = await axios.get("/auth/find",options);
    const courses_data = await axios.get("khoahoc/get-all",options);
    user_data && SetUserInformation({"username":user_data.data.username,"email":user_data.data.email,"exp":user_data.data.exp,"coin":user_data.data.coin});
    courses_data && SetCourseData(courses_data.data);
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
   
    <>
     <Container fluid>
      <Row>
       <Col md={2} className={sideBar}><SideBar config={sideBarconfig} /></Col>
       <Col md={10} className={navBar}>
        <NavBar coin={UserInformation.coin} exp={UserInformation.exp}/>
        <Shuffle/>
        {CourseData.map((course)=><CourseBox key={course._id} courses={course}/>)}
       </Col>
      </Row>
     </Container>
    </>
  )

 


}
export default LearningPage