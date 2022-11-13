import React,{useState,useEffect,useRef} from 'react';
import styles from './Story.module.scss';
import classNames from 'classnames/bind';
import NavBar from '../../components/NavBar/NavBar';
import SideBar from '../../components/SideBar/SideBar';
import {Container,Row,Col} from 'react-bootstrap';
import StoryBox from '../../components/StoryBox/StoryBox';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const config = {baseURL: 'http://localhost:5000/api',withCredentials: true,};
const cx = classNames.bind(styles);
const sideBar = cx("side-bar");
const navBar = cx("nav-bar");
const main = cx("main");
const content = cx("content");
const category = cx("category")
const imgContent = cx("img-content");
const imgCard = cx("img-card");

const sideBarconfig = {
  "learning":false,
  "flashcard":false,
  "search":false,
  "story":true,
 }
const Story = () => {
    const chilrenRef = useRef([]);
    
    
       const nagivate = useNavigate();
       const [UserInformation,SetUserInformation] = useState({"username:":"","email":"",});
       const [DataStories,SetDataStories] = useState([]);
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
        const GetStory = async () => {
          const story = await axios.get("/stories/get-stories",config);
          story["data"] && SetDataStories(story["data"]);
          
        }
        useEffect(()=>{
            GetUserData();
            GetStory();
          
           },[])
           useEffect(()=>{
            // console.log(chilrenRef.current);
           })
          const ShowDetail = (i) => {
            DisableAll();
            chilrenRef.current[i].style.display == "none" ? chilrenRef.current[i].style.display = "flex" : chilrenRef.current[i].style.display = "none"

           }
           const DisableAll = () => {
             chilrenRef.current.forEach((item,i)=>{ chilrenRef.current[i].style.display = "none" ;})
           }
  return (
    <Container fluid onClick={DisableAll}>
    <Row className={main}>
     <Col md={2} className={sideBar}><SideBar config={sideBarconfig}/></Col>
     <Col md={10} className={navBar}>
       <Row><NavBar username={UserInformation.username} email={UserInformation.email}/></Row>
      <Row className={content}>
        
             <div className={category}> Story about animals</div>
             <div className={imgContent}>
             {DataStories.map((item,i)=><StoryBox key={item._id} data={item} ref={el => chilrenRef.current[i] = el} index={i} Click={ShowDetail}/>)}
             </div>
      </Row>
     </Col>
    </Row>
   </Container>
  )
}

export default Story